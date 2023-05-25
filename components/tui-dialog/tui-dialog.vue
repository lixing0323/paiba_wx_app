<template>
	<view @touchmove.stop.prevent="stopEvent">
		<view v-if="show" class="tui-dialog"
			:style="{background:backgroundColor,borderRadius:radius,zIndex:zIndex, height: height}"
			@tap.stop="stopEvent">
			<view class="tui-dialog__hd">
				<view class="tui-dialog__title" :style="{color:titleColor, textAlign: titleTextAlign}">{{title}}
					<slot name="title"></slot>
				</view>
			</view>
			<view class="tui-dialog__bd" :style="{color:contentColor}">
				<slot name="content"></slot>
			</view>
			<slot name="static"></slot>
			<view class="tui-dialog__ft">
				<block v-if="buttons && buttons.length">
					<view v-for="(item,index) in buttons" :key="index" :style="{color:item.color || '#333'}"
						class="tui-dialog__btn" :data-index="index" @tap="buttonTap">{{item.text}}</view>
				</block>
				<slot name="footer" v-else></slot>
			</view>
		</view>
		<view @tap="close" class="tui-dialog__mask" :style="{zIndex:zIndex-1}" :class="{'tui-mask_hidden':!show}"
			v-if="mask"></view>
	</view>
</template>

<script>
	export default {
		name: 'tuiDialog',
		emits: ['click', 'close'],
		props: {
			height: {
				type: String,
				default: null
			},
			title: {
				type: String,
				default: ''
			},
			maskClosable: {
				type: Boolean,
				default: true
			},
			mask: {
				type: Boolean,
				default: true
			},
			show: {
				type: Boolean,
				default: false
			},
			buttons: {
				type: Array,
				default () {
					return []
				}
			},
			backgroundColor: {
				type: String,
				default: '#fff'
			},
			radius: {
				type: String,
				default: '12px'
			},
			titleColor: {
				type: String,
				default: '#333'
			},
			titleTextAlign: {
				type: String,
				default: 'center'
			},
			contentColor: {
				type: String,
				default: '#999'
			},
			zIndex: {
				type: Number,
				default: 5000
			},
		},
		created() {

		},
		methods: {
			touchmove(e) {
				e.preventDefault()
				e.stopPropagation()
				return false
			},
			buttonTap(e) {
				const {
					index
				} = e.currentTarget.dataset;
				this.$emit('click', {
					index,
					item: this.buttons[index]
				});
			},

			close() {
				if (!this.maskClosable) return;
				this.$emit('close', {});
			},

			stopEvent() {
				return false;
			}
		}
	}
</script>

<style>
	.tui-dialog {
		position: fixed;
		top: 50%;
		left: 16px;
		right: 16px;
		transform: translateY(-50%);
		text-align: center;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		max-height: 90%;
	}

	.tui-dialog__hd {
		padding: 30rpx;
	}

	.tui-dialog__title {
		font-weight: 700;
		font-size: 17px;
		line-height: 1.4
	}

	.tui-dialog__bd {
		padding: 0 35rpx;
		margin-bottom: 32px;
		font-size: 15px;
		line-height: 1.4;
		word-wrap: break-word;
		-webkit-hyphens: auto;
		hyphens: auto;
	}


	.tui-dialog__ft {
		display: flex;
		position: relative;
		line-height: 56px;
		min-height: 56px;
		font-size: 17px
	}

	.tui-dialog__ft:after {
		content: " ";
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		height: 1px;
		border-top: 1px solid rgba(0, 0, 0, .1);
		transform-origin: 0 0;
		transform: scaleY(.5)
	}

	.tui-dialog__btn {
		display: block;
		flex: 1;
		/* font-weight: 700; */
		text-decoration: none;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		position: relative
	}

	.tui-dialog__btn:active {
		background-color: #ECECEC
	}

	.tui-dialog__btn:first-child::after {
		width: 0;
		border-left: 0;
	}

	.tui-dialog__btn::after {
		content: " ";
		position: absolute;
		left: 0;
		top: 0;
		width: 1px;
		bottom: 0;
		border-left: 1px solid rgba(0, 0, 0, .1);
		transform-origin: 0 0;
		transform: scaleX(.5)
	}

	.tui-dialog__mask.tui-mask_hidden {
		opacity: 0;
		transform: scale3d(1, 1, 0)
	}

	.tui-dialog__mask {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .6);
		opacity: 1;
		transform: scale3d(1, 1, 1);
		transition: all .2s ease-in
	}
</style>