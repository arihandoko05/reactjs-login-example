import React from 'react';

class Detail extends React.Component {

    render() {
        return (
            <div>
                <h1>{this.props.value.name}</h1>
                <p>{this.props.value.description || 'Error get data movie'}</p>
            </div>
        )
    }
}

export default Detail;