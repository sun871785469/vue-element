<template>
	<el-container>
		<el-header style="height:52px;">
			<div class="header-wrap">
				<div class="logo fl">
					<div class="bababus_logo">
						<img src="../assets/images/bababus_logo.png">
					</div>
					<img src="../assets/images/Bbooking-System_logo.png" class="system-logo">
				</div>
				<div class="header-info fr">
					<img src="../assets/images/head_icon.png" @click="gotoMine()">
					<span class="info-name">admin</span>
					<el-badge :value="msgCount" :max="99" class="item new-info">
						<img src="../assets/images/news_icon.png" @click="gotoMessage()">
					</el-badge>

					<span class="info-massage" @click="gotoMessage()">消息</span>
					<img src="../assets/images/quit_icon.png" @click="quitLogin()">

					<span class="info-exit" @click="quitLogin()">退出</span>
				</div>
			</div>
		</el-header>
		<el-container>
			<navBar :add="add" :navData="navData"></navBar>
			<el-main>
				<tab ref="routerTab"></tab>
				<keep-alive>
					<router-view class="view"></router-view>
				</keep-alive>
			</el-main>
		</el-container>
		<ajax ref="ajaxM"></ajax>
	</el-container>
</template>
<script>
	require("../assets/css/index.css")
	import tab from './tab'
	import navBar from '../components/navBar'
	import ajax from '../components/ajax'
	export default {
		components: { tab, navBar, ajax },
		data() {
			return {
				msgCount: 0,
				navData: {},
				partnerName: '',
				account:""
			}
		},
		watch: {
			$route() {
				if (this.$route.path != "/") {
					this.$refs.routerTab.addTab()
				}
			},
		},
		mounted() {
			var self = this;
			if (this.$route.path != "/") {
				this.$refs.routerTab.addTab()
			}
			// this.$refs.ajaxM.postF('/resource/menu', {}, true, (result) => {
			// 	self.navData = result
			// 	self.msgCount = result.messageCount
			// 	self.partnerName = result.partnerName
			// 	self.account = result.account
			// 	sessionStorage.setItem("bookingMenuData", JSON.stringify(result))
			// })
		},
		methods: {
			add(menu) {
				this.$refs.routerTab.addTab(menu)
			},
			quitLogin() {
				var self = this
				self.$confirm('是否确定退出?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					self.$refs.ajaxM.postF('/user/logout', {}, true, () => {
						self.$router.push('/login')
						sessionStorage.clear();
						self.$message({
							type: 'success',
							message: '退出成功!'
						});
					})
				}).catch(() => {
					self.$message('退出失败!');
				})
			},
			gotoMine() {
				this.$router.push('/updatePwd')
			},
			gotoMessage() {
				this.$router.push('/myMessage')
			}
		}
	}
</script>