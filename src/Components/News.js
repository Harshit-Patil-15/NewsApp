import React, { Component } from 'react'
import Newsitems from './Newsitems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'



export default class News extends Component {
  static defaultProps = {
  pageSize:5,
  category:"general",
  country:"in",
  }
  static propTypes = {
   category:PropTypes.string,
    country:PropTypes.string,
    pageSize:PropTypes.number,
  }


constructor(){
  super();
  console.log("hello i am a news component constructor")
  this.state={
 articles: [],
 loading: false,
 page:1
}
}
//1074edb687e4418d973e3fd4450ee6ba-new api key
async componentDidMount(){
 
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d9d9587eaf5a4cfcad0945f0a004dac9&page=1&pagesize=${this.props.pageSize}`;
let data=await fetch(url);
let parsedData= await data.json();

this.setState({articles: parsedData.articles ,
  totalResults: parsedData.totalResults
              })
}
handelNextClick=async () =>{
if(!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d9d9587eaf5a4cfcad0945f0a004dac9&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
this.setState({loading :true});
let data=await fetch(url);
let parsedData= await data.json();
this.setState({
 
  page:this.state.page +1,
  articles: parsedData.articles,
  loading:false
})
}
}
handelPreviousClick=async () =>{
  console.log("prev")
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d9d9587eaf5a4cfcad0945f0a004dac9&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
  this.setState({loading :true});
  let data=await fetch(url);
  let parsedData= await data.json();
  this.setState({
    page:this.state.page -1,
  articles: parsedData.articles,
  loading:false
  })
}
  render() {
    return (
      <div className='container'>
      <h1 className='my-4 text-center'>NewsMonkey -Top Headlines</h1>
     {this.state.loading&& <Spinner/>}
        <div className="row">
        {!this.state.loading&& this.state.articles.map((element)=>{
         return <div className="col-md-4" key={element.url}>
          <Newsitems title={element.title} source={element.source.name} author={element.author==null?" unknown":element.author} date={element.publishedAt} discription={element.discription} newsUrl={element.url} imageUrl={element.urlToImage}/>
                                                                                
          </div>

        })}
        
        </div>
        <div className="d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handelPreviousClick}>&larr; Previous</button>
        <button type="button" disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handelNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

