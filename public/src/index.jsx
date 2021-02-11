class App extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            url: '', //property name to coincide with input name
            short_url: '',
            error: null,
            copy: 'Copy URL'
        }
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCopy = this.handleCopy.bind(this);
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
            short_url: 'https://url-dwarf.herokuapp.com/' + data.short_url,
            error: data.error
        }))
        .catch(err => console.log(err))
    }

    handleClick() {
        let input = document.getElementById('res');
        let inputVal = input.value;
        if (this.state.error == null && inputVal.length != 0) {
            input.focus();
            input.select();
            document.execCommand('copy');
            this.setState({
                copy: 'Copied!'
            })
        }
    }

    handleCopy() {
        this.setState({
            copy: 'Copy URL'
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
                            <div className="input">
                            <label for="url-input">
                                URL: 
                            </label>
                            <input 
                                className="form-control"
                                type="text" 
                                name="url" 
                                value={this.state.url} 
                                placeholder="Enter a valid URL..."
                                onChange={this.changeHandler}/>
                            </div>
                            <button 
                                onClick={this.handleCopy}
                                className="btn btn-outline-light submit" 
                                type="submit"
                            >
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
                                className="form-control" 
                                value={
                                    this.state.error != null 
                                    ? this.state.error
                                    : this.state.short_url
                                }/>  
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('react-dom'))