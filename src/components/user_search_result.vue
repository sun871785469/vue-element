<template>
<div>
  <div class="business-operation">
    <span class="opera-item" @click="addUser">
      <i class="el-icon-plus"></i>
      <span>新增</span>
    </span>
    <span class="opera-item" @click="modifyUser">
      <i class="el-icon-edit"></i>
      <span>修改</span>
    </span>
    <span class="opera-item" @click="stopUser">
      <i class="el-icon-edit"></i>
      <span>停用</span>
    </span>
    <span class="opera-item" @click="passUser">
      <i class="el-icon-edit"></i>
      <span>启用</span>
    </span>
    <span class="opera-item" @click="deleteUser">
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
      label="登录账号">
    </el-table-column>
    <el-table-column
      prop="routeLevelName"
      label="密保手机">
    </el-table-column>
    <el-table-column
      prop="startStopName"
      label="重置密码">
    </el-table-column>
    <el-table-column label="状态">
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
    :visible.sync="userDialog"
    width="30%">
    <el-form ref="form" size="mini" label-width="80px">
      <el-form-item label="商户全称">
        <el-select v-model="businessName" class="check-businessName" placeholder="请选择">
          <el-option label="全选" value=""></el-option>
          <el-option></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="登录账号">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="登录密码">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="密保手机">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="状　　态">
      </el-form-item>
    </el-form>
    <div class="add-business">确定</div>
  </el-dialog>
  <el-dialog
    title="重置密码"
    :visible.sync="password"
    width="30%">
    <el-form ref="form" size="mini" label-width="90px">
      <el-form-item label="旧密码：">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="新密码：">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="重置新密码：">
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
        userDialog:false,
        password:false,
        title:"",
        businessName:""
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
      addUser(){
        this.title = "新增用户";
        this.userDialog = true;
      },
      modifyUser(){
        this.title = "修改用户";
        this.userDialog = true;
      },
      stopUser(){

      },
      passUser(){

      },
      deleteUser(){

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
  .check-businessName{
    width: 100%;
  }
</style>