<template>
  <el-form :inline="true" class="demo-form-inline business-form" size="mini" label-width="80px">
		<el-form-item label="商户名:" class="business-name">
		  <el-input class="business-input" v-model="businessName" placeholder="请输入商户名"></el-input>
		</el-form-item>
		<el-form-item label="联系人:">
		  <el-input class="business-input" v-model="name" placeholder="请输入联系人姓名"></el-input>
		</el-form-item>
    <el-form-item label="联系电话:">
      <el-input class="business-input" v-model="mobilePhone" placeholder="请输入电话号码"></el-input>
    </el-form-item>
    <el-form-item class="fr">
      <el-button type="primary" icon="el-icon-search" @click="searchOrdre">搜索</el-button>
    </el-form-item>
	  <ajax ref="ajaxM"></ajax>
  </el-form>
</template>
<script>
import ajax from './ajax'
  export default {
    data() {
      return {
        businessName:"",
        name:"",
        mobilePhone:""
      }
    },
    components:{ajax},
    mounted(){
    	
    },
    methods: {
    	// 查询订单
      searchOrdre(){

      }
    }
  }
</script>
<style>
  .business-form{
    padding: 0 15px;
  }
  .business-name .el-form-item__label{
    margin-left: -30px;
  }
  .business-input{
    width: 150px;
  }
  .el-form-item__content .date-select{
    width: 346px;
  }
  @media screen and (min-width:1440px) and (max-width:1930px){
  	.business-input{
  	  width: 280px;
  	}
  }
</style>