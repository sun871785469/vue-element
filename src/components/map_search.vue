<template>
    <div :class="showMap==true?'showMap':'hidemap'">
        <div class="el-dialog__wrapper zindex">
            <div class="el-dialog el-dialog-w">
                <div class="el-dialog__header"><span class="el-dialog__title">地图</span><button type="button" aria-label="Close" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close" @click="handleClose"></i></button></div>
                <div class="el-dialog__body">
                    <el-form :inline="true" class="demo-form-inline order-form" size="mini" label-width="60px" v-if="mapType=='1'">
                      <el-form-item label="地点:">
                          <el-input id="suggestId" v-model="address"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="addressBtn">确定</el-button>
                      </el-form-item>
                    </el-form>
                    <div id="allmap"></div>
                    <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
                </div>
            </div>
        </div>
        <div class="mask" @click="handleClose"></div>
    </div>

</template>
<script>
    export default {
        data() {
            return {
                map: {},
                address:"",
                lat:"",
                lng:"",
                mk:{},
            }
        },
        //mapType 1 修改坐标 2 展示坐标 showPoint 需要展示/修改的点坐标 showPoint格式：{lat:"",lng:""}
        props: [
            "mapType", "showPoint","showMap"
        ],
        activated(){
            this.init()
        },
        mounted() {
            
        },
        watch:{
            address(val,oldVal){
                if(val.length>0){
                    $(".tangram-suggestion-main").css("z-index","99999")
                    $(".tangram-suggestion-main").css("display","block")
               }
            },
            showMap(val,oldVal){
                var self = this;
                if(this.mapType == "1"){
                    this.address = "";
                    self.map.clearOverlays();
                    self.location();
                }else{
                    this.mapScreen()
                }
            }
        },
        methods: {
            init(){
                var self =  this;
                
                self.map = new BMap.Map("allmap");
                if(self.mapType == "1"){
                    self.location();
                    self.map.centerAndZoom("杭州",12);
                    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
                        {"input" : "suggestId"
                        ,"location" : self.map
                    });

                    ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
                        var str = "";
                        var _value = e.fromitem.value;
                        var value = "";
                        if (e.fromitem.index > -1) {
                            value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                        }    
                        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
                        
                        value = "";
                        if (e.toitem.index > -1) {
                            _value = e.toitem.value;
                            value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                        }    
                        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
                        $("searchResultPanel").innerHTML = str;
                    });

                    ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
                        var _value = e.item.value;
                        self.myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                        $("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + self.myValue;
                        
                        self.setPlace();
                    });
                }else{
                    self.mapScreen();
                }
                self.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
            },
            // 关闭地图
            handleClose(){
                this.$parent.showMap = false;
            },
            // 確定地点
            addressBtn(){
                this.$parent.lat = this.lat
                this.$parent.lng = this.lng
                this.$parent.showMap = false;
            },
            setPlace(){
                var self = this
                self.map.clearOverlays();    //清除地图上所有覆盖物
                function myFun(){
                    var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                    self.lat = pp.lat;
                    self.lng = pp.lng;
                    self.map.centerAndZoom(pp, 16);
                    var mk = new BMap.Marker(pp)
                    self.map.addOverlay(mk);    //添加标注
                    mk.enableDragging(); 
                    mk.addEventListener("dragend", function(e){ //拖动事件 
                        self.lat = e.point.lat
                        self.lng = e.point.lng
                    })
                }
                var local = new BMap.LocalSearch(self.map, { //智能搜索
                  onSearchComplete: myFun
                });
                local.search(self.myValue);
            },
            mapScreen(){
                let self = this;
                let point = new BMap.Point(self.showPoint.lng,self.showPoint.lat);
                self.map.centerAndZoom(point,16);
                self.map.addOverlay(new BMap.Marker(point));    //添加标注
            },
            location(){
                var self = this;
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function(r){
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                        self.mk = new BMap.Marker(r.point);
                        self.map.addOverlay(self.mk);
                        self.map.centerAndZoom(new BMap.Point(r.point.lng,r.point.lat),16);
                        self.lat = r.point.lat
                        self.lng = r.point.lng
                    }else {
                        self.mk = new BMap.Marker(120.219396,30.297149);
                        self.map.addOverlay(self.mk);
                        self.map.centerAndZoom(new BMap.Point(120.219396,30.297149),16); 
                        self.lat = "30.297149"
                        self.lng = "120.219396"
                    }
                    self.mk.enableDragging(); 
                    self.mk.addEventListener("dragend", function(e){ //拖动事件 
                        self.lat = e.point.lat
                        self.lng = e.point.lng
                    })        
                },{enableHighAccuracy: true})
            }
        }
    }
</script>
<style scoped>
    #allmap{
        width: 100%;
        height: 400px;
    }
    #suggestId{
        width: 160px;
    }
    .mask {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
        opacity: .5;
        background: #000;
    }
    .zindex{
        z-index: 1999;
    }
    .el-dialog-w{
        width: 70%;
    }
</style>