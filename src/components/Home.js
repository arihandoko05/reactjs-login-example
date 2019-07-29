import React from 'react';
import Detail from '../components/Detail';
import {authService} from '../services/authService';
import {movieService} from '../services/movieService';
import {Button, Form, Col, Row, Tab, Nav} from 'react-bootstrap';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [1],
            movieDetail: {
                id: ''
            }
        };
    }

    componentDidMount() {
        movieService.getList().then(response => {
            this.setState({movies: response.data});
            //set default first data to select detail
            this.getDetail(this.state.movies[0])
        });
    }

    logout = () => {
        authService.logout();
    };

    getDetail = (id) => {
        movieService.getDetail(id).then(response => {
            if (response.data) {
                this.setState({movieDetail: response.data})
            }
        }).catch(error => {
            console.log(error);
            this.setState({movieDetail: {}})
        });
    };

    render() {
        const {movies, movieDetail} = this.state;
        return (
            <div>
                <Form.Group as={Row}>
                    <Col sm={{span: 2, offset: 10}} className="text-right">
                        <Button type="button" onClick={this.logout}>Sign out</Button>
                    </Col>
                </Form.Group>

                <Tab.Container id="left-tabs-example" defaultActiveKey={movies[0].toString()} onSelect={this.getDetail}>
                    <Row className="container">
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                {movies.map((movie, index) =>
                                    <Nav.Link key={index} eventKey={movie.toString()}> Movie {movie}</Nav.Link>
                                )}
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey={movieDetail.id}>
                                    <Detail value={movieDetail}/>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        )
    }
}

export default Home;