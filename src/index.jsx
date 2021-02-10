class App extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            url: '', //property name to coincide with input name
            short_url: '',
            copy: 'Copy URL'
        }
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    changeHandler = (e) => {
        this.setState({
            url: e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault();
        fetch('/api/shorturl/new', {
            method: 'POST',
            body: new URLSearchParams(this.state),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        })
        .then(res => res.json())
        .then(data => this.setState({
            short_url: data.short_url
        }))
        .catch(err => console.log(err))
    }

    handleClick() {
        let input = document.getElementById('res');
        input.focus();
        input.select();
        document.execCommand('copy');
        this.setState({
            copy: 'Copied!'
        })
    }

    render() {
        return (
            <div>
                <h1>
                    Shorten your URL!
                </h1>
                <div className="container-md">
                    <div className="inner-container">
                        <form onSubmit={this.submitHandler}>
                            <label for="url-input">
                                URL: 
                            </label>
                            <input 
                                id="url_input" 
                                type="text" 
                                name="url" 
                                value={this.state.url} 
                                placeholder="Enter a valid URL..."
                                onChange={this.changeHandler}/>
                            <button className="btn btn-outline-light" type="submit">
                                Submit
                            </button>
                        </form>
                        <div className="result-container">
                            <button 
                                className="btn btn-outline-light copy"
                                onClick={this.handleClick} 
                                type="submit">
                                {this.state.copy}
                            </button>
                            <input 
                                id="res"
                                type="text" 
                                className="url-container" //change domain name for netlify
                                value={this.state.short_url}/>  
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('react-dom'))