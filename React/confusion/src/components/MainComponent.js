import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
    fetchComments,
    fetchDishes,
    fetchPromos,
    fetchLeaders,
    postComment,
    postFeedback,
} from '../redux/ActionCreators';
import { COMMENTS } from '../shared/comments';
import { DISHES } from '../shared/dishes';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import About from './AboutComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders,
    };
};

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    postFeedback: (firstName, lastName, telNumber, email, canContact, contactMethod, feedback) =>
        dispatch(postFeedback(firstName, lastName, telNumber, email, canContact, contactMethod, feedback)),
    fetchDishes: () => {
        dispatch(fetchDishes());
    },
    resetFeedbackForm: () => {
        dispatch(actions.reset('feedback'));
    },
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
});

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS,
        };
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }

    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishErrMess={this.props.dishes.errMess}
                    promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    promoLoading={this.props.promotions.isLoading}
                    promoErrMess={this.props.promotions.errMess}
                    leader={this.props.leaders.leaders.filter((leaders) => leaders.featured)[0]}
                    leaderLoading={this.props.leaders.isLoading}
                    leaderErrMess={this.props.leaders.errMess}
                />
            );
        };

        const DishWithId = ({ match }) => {
            return (
                <DishDetail
                    dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.comments.filter(
                        (comment) => comment.dishId === parseInt(match.params.dishId, 10)
                    )}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                />
            );
        };

        return (
            <div>
                <Header />
                <div>
                    <TransitionGroup>
                        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                            <Switch location={this.props.location}>
                                <Route path="/home" component={HomePage} />
                                <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
                                <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                                <Route path="/menu/:dishId" component={DishWithId} />
                                <Route
                                    exact
                                    path="/contactus"
                                    component={() => (
                                        <Contact
                                            resetFeedbackForm={this.props.resetFeedbackForm}
                                            postFeedback={this.props.postFeedback}
                                        />
                                    )}
                                />
                                <Redirect to="/home" />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
