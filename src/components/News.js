import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {
      country: 'in',
      pageSize: 8,
      category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor(props)
    {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = "NewsKing - "+this.capitalizeFirstLetter(this.props.category);
    }


    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async updateNews(){
      this.props.setProgress(20);
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bedd1fa1ea8947cd850ab36166ec583c&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      this.props.setProgress(40);
      let parsedData = await data.json();
      this.props.setProgress(70);

      this.setState({articles: parsedData.articles, 
        totalResults: parsedData.totalResults,
        loading: false,
      });
      this.props.setProgress(100);
    }


  //it will run after render method
  async componentDidMount(){
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bedd1fa1ea8947cd850ab36166ec583c&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
  
    // this.setState({articles: parsedData.articles, 
    //   totalResults: parsedData.totalResults,
    //   loading:false
    // });
    this.updateNews();
  }

  // handlePreviousClick = async () =>{
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bedd1fa1ea8947cd850ab36166ec583c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   // this.setState({loading: true});
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();

  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles: parsedData.articles,
  //   //   loading: false
  //   // })

  //   this.setState({page: this.state.page-1});
  //   this.updateNews();
  // } 
  // handleNextClick = async () =>{
  //   // if(this.state.page+1 <= Math.ceil(this.state.totalResults/this.props.pageSize))
  //   // {
  //   //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bedd1fa1ea8947cd850ab36166ec583c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //   //   this.setState({loading: true});
  //   //   let data = await fetch(url);
  //   //   let parsedData = await data.json();
  
  //   //   this.setState({
  //   //     articles: parsedData.articles,
  //   //     page: this.state.page + 1,
  //   //     loading: false
  //   //   })
  //   // }
  //   this.setState({page: this.state.page+1});
  //   this.updateNews();
  // }

  fetchMoreData = async() => {
    this.setState({page: this.state.page+1});
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bedd1fa1ea8947cd850ab36166ec583c&page=${this.state.page}&pageSize=${this.props.pageSize}`;

      let data = await fetch(url);
      let parsedData = await data.json();
    
      this.setState({
        articles: this.state.articles.concat(parsedData.articles), 
        totalResults: parsedData.totalResults
      });
  };

  render() {
    return (
      <>
      {/* <div className='container my-3'> */}
      <h1 className="text-center" style={{margin: '30px 0px'}}><strong>NewsKing</strong> - Top <strong>{this.capitalizeFirstLetter(this.props.category)}</strong> Headlines</h1>

        {/* {this.state.loading && <Spinner/>} */}


            <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={this.state.articles.length<this.state.totalResults}
              loader={<Spinner/>}
            >

                <div className="container">
                    <div className="row">
                      {/*!this.state.loading &&*/ this.state.articles.map((element)=>{
                          return <div key={element.url} className="col md-4">
                                <NewsItem title={element.title? element.title/*.slice(0, 45)*/:""} description={element.description? element.description/*.slice(0, 88)*/: ""} imageUrl={element.urlToImage} url={element.url} author={element.author? element.author: "Unknown"} date={element.publishedAt} source={element.source.name}/>
                          </div>
                    })}
                    </div>
                </div>
            </InfiniteScroll>
            
            {/* Previous and next button code */}
            {/* <div className="d-flex justify-content-between">
              <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
              <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div> */}
      {/* </div> */}
      </>
    )
  }
}

export default News
