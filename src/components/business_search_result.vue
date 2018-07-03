<template>
<div>
  <div class="business-operation">
    <span class="opera-item" @click="addBusiness">
      <i class="el-icon-plus"></i>
      <span>新增</span>
    </span>
    <span class="opera-item" @click="modifyBusiness">
      <i class="el-icon-edit"></i>
      <span>修改</span>
    </span>
    <span class="opera-item" @click="deleteBusiness">
      <i class="el-icon-delete"></i>
      <span>删除</span>
    </span>
  </div>
  <!-- 表格 -->
  <el-table
    ref="multipleTable"
    :data="routelist"
    tooltip-effect="dark"
    stripe
    :max-height="height"
    style="width: 100%"
    class="travel-table"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection">
    </el-table-column>
    <el-table-column
      prop="name"
      label="商户全称">
    </el-table-column>
    <el-table-column
      prop="simplySpell"
      label="商户简称">
    </el-table-column>
    <el-table-column
      prop="routeLevelName"
      label="联系人">
    </el-table-column>
    <el-table-column
      prop="startStopName"
      label="联系手机">
    </el-table-column>
    <el-table-column
      prop="endStopName"
      label="地址">
    </el-table-column>
    <el-table-column label="备注">
      <template slot-scope="scope">
        <span @click="viewNote(scope.$index, scope.row)" class="color4877dd">查看</span>
      </template>
    </el-table-column>
  </el-table>
  <ajax ref="ajaxM"></ajax>
  <!-- 分页 -->
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[10, 20, 50, 100]"
    :page-size="20"
    class="page-wrap"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
  <el-dialog
    :title="title"
    :visible.sync="businessDialog"
    width="30%">
    <el-form ref="form" size="mini" :model="form" label-width="80px">
      <el-form-item label="商户全称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="商户简称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="联 系 人">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="联系手机">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="地　　址">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="备　　注">
        <el-input></el-input>
      </el-form-item>
    </el-form>
    <div class="add-business">确定</div>
  </el-dialog>
</div>
</template>
<script>
import ajax from '../components/ajax'
  export default {
    data() {
      return {
        multipleSelection: [],
        routeData:[],
        height:2000,
        businessDialog:false,
        title:""
      }
    },
    props:["currentPage","routelist","total"],
    components:{ajax},
    mounted(){
      this.height = $(window).height(); 
    },
    methods: {
      handleSizeChange(val) {
        var self = this;
        this.$parent.pageSize = val
        let obj = this.$parent.handleData(this.$parent.currentPage,val);
        self.$refs.ajaxM.postM("/routeModel/queryRouteModelList",obj,true,function(obj){
          self.$parent.routelist = obj.routeModelPage.list
        })
      },
      handleCurrentChange(val) {
        var self = this;
        this.$parent.currentPage = val
        let obj = this.$parent.handleData(val,this.$parent.pageSize);
        self.$refs.ajaxM.postM("/routeModel/queryRouteModelList",obj,true,function(obj){
          self.$parent.routelist = obj.routeModelPage.list
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      viewNote(){

      },
      addBusiness(){
        this.title = "新增商户";
        this.businessDialog = true;
      },
      modifyBusiness(){
        this.title = "修改商户";
        this.businessDialog = true;
      },
      deleteBusiness(){

      }
    }
  }
</script>
<style>
  .business-operation{
    height: 55px;
    line-height: 55px;
    color: #4877dd;
    border-top: 1px solid #e3e3e3;
  }
  .opera-item{
    margin-left: 15px;
    cursor: pointer;
  }
  .add-business{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #4877dd;
    color: #fff;
    text-align: center;
    border-radius: 4px;
    font-size: 16px;
    margin-top: 20px;
    cursor: pointer;
  }
</style>