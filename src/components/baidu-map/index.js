/**
 * @desc 地图组件
 * @date 2017-09-14
 **/
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {Button,Input,message} from 'antd'
import './style.less'
const AK = "1zAXlppx0Zat5d4DZBddlxnNT09r0Kht"
const Search = Input.Search

class BaiduMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address : null,
      dataSource: this.props.coordData,
      position: this.props.position,
    }
    this.map = null   // 地图实例
  }

  componentWillMount() {
    this.loadMapSDK()
  }
  componentWillReceiveProps(nextProps) {
    if (this.props && nextProps) {
      // console.log('nextProps.coordData map',nextProps.coordData)
      this.setState({
        dataSource: nextProps.coordData,
        position: nextProps.position,
      })
    }
  }
  show() {
    this.timer = setInterval(()=>{
      if (typeof BMap != 'undefined') {
        clearInterval(this.timer)
        if (this.props.showPath) {
          this.loadMap()
        }else {
          this.initMap()
        }
      }
    }, 1000)
  }
  changeCenter() {
    const opts = {
          width : 180,     // 信息窗口宽度
          height: 50,     // 信息窗口高度
          title : "定位信息" , // 信息窗口标题
          offset: new BMap.Size(0, -10)
        }
    const { dataSource, position } = this.state
    let position_content = `${position.create_time}到达 ${position.address}`
    let center_point = new BMap.Point(position.lng, position.lat)
    let infoWindow = new BMap.InfoWindow(position_content,opts)
    this.map.centerAndZoom(center_point,13)
    this.map.openInfoWindow(infoWindow,center_point)
  }
  // 异步加载百度API
  loadMapSDK() {
    let bmapSrc=`http://api.map.baidu.com/api?v=2.0&ak=${AK}&callback=init`;
    if(typeof BMap != 'undefined'){
      return;
    }else{
      let script=document.querySelector(`script[src='${bmapSrc}']`);
      if(!script){
        script= document.createElement("script");
        script.src = bmapSrc;
        document.body.appendChild(script);
      }
    }
  }

  initMap() {
    this.map = new BMap.Map("allmap");
    this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    const myCity = new BMap.LocalCity();
    myCity.get((result)=>{
      const cityName = result.name;
      this.map.centerAndZoom(cityName);
    })
    this.map.addEventListener("click", (e) => this.onMapClick(e) )
  }
  loadMap() {
    const opts = {
          width : 180,     // 信息窗口宽度
          height: 50,     // 信息窗口高度
          title : "定位信息" , // 信息窗口标题
          offset: new BMap.Size(0, -10)
        }
    const { dataSource, position } = this.state
    this.map = new BMap.Map("allmap")
    this.map.enableScrollWheelZoom(true)
    if (dataSource && dataSource.length > 0) {
      let current_content = `${dataSource[0].create_time}到达 ${dataSource[0].address}`
      let center_point= new BMap.Point(dataSource[0].lng, dataSource[0].lat)
      let infoWindow = new BMap.InfoWindow(current_content,opts)
      for (let i = 0; i < dataSource.length; i++) {
        let content = `${dataSource[i].create_time}到达 ${dataSource[i].address}`
        let point = new BMap.Point(dataSource[i].lng, dataSource[i].lat)
        let marker = new BMap.Marker(point)
        let current_marker = new BMap.Marker(new BMap.Point(dataSource[0].lng, dataSource[0].lat))
        let label = new BMap.Label(dataSource.length - i, {offset : new BMap.Size(2, 4)})
        //只要对label样式进行设置就可达到在标注图标上显示数字的效果
        label.setStyle({background:'none',color:'#fff',border:'none'})
        marker.setLabel(label)
        this.map.addOverlay(marker)
        marker.addEventListener('click',(e) => {
          let infoWindow = new BMap.InfoWindow(content,opts)
          this.map.centerAndZoom(point,13)
          this.map.openInfoWindow(infoWindow,point)
        })
      }
      this.map.centerAndZoom(center_point,13)
      this.map.openInfoWindow(infoWindow,center_point)
    }else {
      const myCity = new BMap.LocalCity();
      myCity.get((result)=>{
        const center_zoom = result.name;
        this.map.centerAndZoom(center_zoom)
        message.warn('暂无定位信息')
      })
    }
  }

  onMapClick(e) {
    //清除所有标注
    this.map.clearOverlays()
    this.lng = e.point.lng
    this.lat = e.point.lat
    const opts1 = {
      pt: e.point, // 指定文本标注所在的地理位置
      offset: new BMap.Size(20, 0), //设置文本偏移量
      lng: e.point.lng,
      lat: e.point.lat,
    }
    // get geo
    const geoc = new BMap.Geocoder()
    geoc.getLocation(opts1.pt, (rs)=>{
      this.address = rs.address
      this.onAddMarker(opts1, rs.address)
    })
  }

  onAddMarker(opts, address) {
    // add marker
    const point = new BMap.Point(opts.lng, opts.lat)
    const marker = new BMap.Marker(point);
    const label = new BMap.Label(address, opts)
    // 将标注添加到地图中
    marker.setLabel(label)
    this.map.addOverlay(marker)
    // callback
    // this.props.callback && this.props.callback(address)
  }

  getAddress() {
    const addr = {
      address : this.address,
      lng : this.lng,
      lat : this.lat,
    }
    return addr
  }

  clearMarker() {
    // console.log('清除')
    this.map.clearOverlays()
  }
  render () {
    const {width} = this.props
    return (
      <div>
        <Search
          placeholder="输入的城市名称"
          style={{ width: 200 }}
          onSearch={(value) => this.map.centerAndZoom(value)}
        />
      <div id='allmap' style={{
        width: width,
        height: 420,
        marginTop: 5,
        border: '1px #d9d9d9 solid',
        }}></div>
      </div>
  )}
}


BaiduMap.propTypes = {
  showPath: PropTypes.bool,
  coordData: PropTypes.array,
  width: PropTypes.number,
  position: PropTypes.object,
}

BaiduMap.defaultProps = {
  showPath: false,
  width: 765,
  position: null,
  coordData: [],
}

export default BaiduMap
