import React, { Component } from 'react'
import NewsItem from './NewsItem'

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
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=bedd1fa1ea8947cd850ab36166ec583c&page=1&pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json();
  
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults});
  }

  handlePreviousClick = async () =>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=bedd1fa1ea8947cd850ab36166ec583c&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({articles: parsedData.articles});

    this.setState({
      page: this.state.page - 1,
    })
  } 
  handleNextClick = async () =>{
    if(this.state.page+1 > Math.ceil(this.state.totalResults/20))
    {

    }
    else
    {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=bedd1fa1ea8947cd850ab36166ec583c&page=${this.state.page + 1}&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json();

      this.setState({articles: parsedData.articles});
  
      this.setState({
        page: this.state.page + 1,
      })
    }
  }

  render() {
    return (
      <div className='container my-3'>
            <h2>NewsKing - Top Headlines</h2>

            <div className="row">
              {this.state.articles.map((element)=>{
                  return <div key={element.url} className="col md-4">
                        <NewsItem title={element.title? element.title/*.slice(0, 45)*/:""} description={element.description? element.description/*.slice(0, 88)*/: ""} imageUrl={element.urlToImage} url={element.url}/>
                  </div>
            })}
            </div>
            <div className="d-flex justify-content-between">
              <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
              <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
      </div>
    )
  }
}

export default News
