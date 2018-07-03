<template>
    <el-aside width="140px">
    	<el-row class="tac">
	    	<el-col :span="24">
	    	    <el-menu
	    	        class="el-menu-vertical-demo"
	    	        @open="handleOpen"
	    	        @close="handleClose"
	    	        background-color="#545c64"
	    	        text-color="#fff"
					active-text-color="#ffd04b"
					:default-openeds = "defaultActive">
	    	      <!-- <el-submenu  v-for="list in menuList" :index="list.menuIndex" :key="list.menuIndex">
	    	        <template slot="title">
	                  <img :src="'../..'+list.icon" class="Side_order">
	    	          <span>{{list.menuText}}</span>
	    	        </template>
	    	        <el-menu-item-group>
	    	          <router-link :to="data.link" v-for="data in list.item"><el-menu-item @click="add(data)" :index="data.itemIndex" :class="data.link==$route.path?'is-active':'not-active'"><li><span>{{data.name}}</span></li></el-menu-item></router-link>
	    	         </el-menu-item>
	    	        </el-menu-item-group>
	    	      </el-submenu> -->
	    	        <el-submenu index="1">
		              	<template slot="title">
		                	<i class="el-icon-location"></i>
		                	<span>权限管理</span>
		              	</template>
		             	<el-menu-item-group>
		                	<router-link to="businessManager"><el-menu-item index="1-1"><li><span>商户管理</span></li></el-menu-item></router-link>
		                	<router-link to="userManager"><el-menu-item index="1-2"><li><span>用户管理</span></li></el-menu-item></router-link>
		              	</el-menu-item-group>
		            </el-submenu>
	    	    </el-menu>
	    	</el-col>
    	</el-row>
    </el-aside>
</template>
<script>
// import { menu } from '../assets/common.js'
  export default {
    data() {
        return {
			menuList:[],
			menuListData:{},
			defaultActive:[],
        }
    },
    mounted(){
		
    },
	props:["add","navData"],
	watch:{
		navData(){
			this.menuListData = this.navData.resourceMenu
			this.setMenuList()
		}
	},
    methods: {
		setMenuList(){
			let defaultActive = new Array()
			let bbookingPowerControl = this.menuListData
			// console.log(this.menuListData)
			var menu = bbookingPowerControl.children.map((item, index) => {
				let children = item.children.map((_item, key) => {
					defaultActive.push(index + '' )
					return {
						itemIndex: index + '-' + key,
						name: _item.name,
						link: _item.url
					}
				})
				return {
					menuIndex: index + '',
					icon: item.icon,
					menuText: item.name,
					item: children
				}
			})
			this.menuList = menu;
			this.defaultActive = Array.from(new Set(defaultActive));
		},
		handleOpen(key, keyPath) {
		},
		handleClose(key, keyPath) {
		},
    
    }
  }
</script>