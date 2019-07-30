import React from 'react';

class Detail extends React.Component {

    render() {
        let description;
        if (this.props.value.errorMessage) {
            description = <p className="error-message">{this.props.value.errorMessage}</p>
        } else {
            description = <p>{this.props.value.description || 'No Description movie'}</p>
        }

        return (
            <div>
                <h1>{this.props.value.name}</h1>
                {description}
            </div>
        )
    }
}

export default Detail;