<template>
	<div v-loading.fullscreen.lock="fullscreenLoading">

	</div>
</template>
<script>
import { BASE_URL } from '../util/driverUrlHost.js'
export default {
	name: 'app',
	data(){
		return{
			fullscreenLoading: false
		}
	},
	created(){

	},
	methods:{
		postM(url, params, progress, successM,async) {
		  var self = this;
			// 是否loading
		  if (progress == true) {
		      self.fullscreenLoading = true
		  }
		  var isasync = false;
		  if(async == true){
		  	isasync = true;
		  }
		  $.ajax({
		  	url: BASE_URL + url,
			type:"post",
		  	data:JSON.stringify(params),
		  	contentType:"application/json;charset=utf-8",
		  	traditional: true,//这里设置为true
			async:isasync,
		  	timeout:10000,
		  	xhrFields: {
		  	    withCredentials: true
		  	},
		  	success:function(res){
		  		self.fullscreenLoading = false
		  		if(res.code == "1000"){
		  			self.$router.push('/login');
		  		}else if(res.code == "0000"){
		  			successM(res.data)
		  		}else{
		  			self.$message.error(res.msg);
		  		}
		  	},
		  	error:function(XMLHttpRequest, textStatus, errorThrown){
		  		self.fullscreenLoading = false;
		  		self.$message.error("网络不给力，请稍后再试试...");
		  	}
		  })
		},
		//form提交
		postF(url, params, progress, successM, async) {
			var self = this;
			// 是否loading
			if (progress == true) {
				self.fullscreenLoading = true
			}
			var isasync = false;
			if (async == true) {
				isasync = true;
			}
			$.ajax({
				url: BASE_URL + url,
				type: "post",
				data: params,
				traditional: true,//这里设置为true
				// async: isasync,
				xhrFields: {
					withCredentials: true
				},
				success: function (res) {
					self.fullscreenLoading = false
					if (res.code == "1000") {
						self.$router.push('/login');
					} else if (res.code == "0000") {
						successM(res.data)
					} else {
						self.$message.error(res.msg);
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					self.fullscreenLoading = false;
					self.$message.error("网络不给力，请稍后再试试...");
				}
			})
		},
		getM(url,params, successM, progress) {
		  var self = this;
		  if (progress == true) {
		    self.fullscreenLoading = true
		  }
		  $.ajax({
		  	url:BASE_URL + url,
		  	data:params,
		  	"type":"get",
		  	traditional: true,//这里设置为true
		  	xhrFields: {
		  	    withCredentials: true
		  	},
		  	success:function(res){
				self.fullscreenLoading = false
				if(res.code == "1000"){
					self.$router.push('/login')
				}else if(res.code == "0000"){
		  			successM(res.data)
		  		}else{
		  			self.$message.error(res.msg);
		  		}
		  	},
		  	error:function(XMLHttpRequest, textStatus, errorThrown){
		  		self.$message.error("网络不给力，请稍后再试试...");
		  	}
		  })
		}
	}
}
</script>