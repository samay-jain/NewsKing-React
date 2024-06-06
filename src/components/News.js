import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

    constructor()
    {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

  //it will run after render method
  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=bedd1fa1ea8947cd850ab36166ec583c&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
  
    this.setState({articles: parsedData.articles, 
      totalResults: parsedData.totalResults,
      loading:false
    });
  }

  handlePreviousClick = async () =>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=bedd1fa1ea8947cd850ab36166ec583c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })
  } 
  handleNextClick = async () =>{
    if(this.state.page+1 <= Math.ceil(this.state.totalResults/this.props.pageSize))
    {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=bedd1fa1ea8947cd850ab36166ec583c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json();
  
      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1,
        loading: false
      })
    }
  }

  render() {
    return (
      <div className='container my-3'>
      <h1 className="text-center">NewsKing - Top Headlines</h1>

      {this.state.loading && <Spinner/>}

            <div className="row">
              {!this.state.loading && this.state.articles.map((element)=>{
                  return <div key={element.url} className="col md-4">
                        <NewsItem title={element.title? element.title/*.slice(0, 45)*/:""} description={element.description? element.description/*.slice(0, 88)*/: ""} imageUrl={element.urlToImage} url={element.url}/>
                  </div>
            })}
            </div>
            <div className="d-flex justify-content-between">
              <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
              <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
      </div>
    )
  }
}

export default News
