<template>
  <div>
    <searchCerteria ref="orderSearch"></searchCerteria>
    <searchResult :currentPage="currentPage" :orderSearchTotal="orderSearchTotal" :page="page"></searchResult>
  </div>
</template>

<script>
import searchCerteria from "../components/user_search_criteria"
import searchResult from "../components/user_search_result"
  export default {
    components:{searchCerteria,searchResult},
    data() {
      return {
        currentPage:1,
        orderSearchTotal:{},
        page:{
          list:[],
        },
        pageSize:20,
      }
    },
    methods: {
      handleData(currentPage,pageSize){
        let orderData = {
          currentPage:currentPage,
          pageSize:pageSize,
          businessName:this.$refs.orderSearch.businessName,
          name:this.$refs.orderSearch.name,
          mobilePhone:this.$refs.orderSearch.mobilePhone,
        }
        return orderData;
      },
    }
  }
</script>
<style>
  
</style>