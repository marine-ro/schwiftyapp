<template>
    <ul class="view-mode">
        <li
            class="view-mode__item link"
            :class="{'active': mode.view === activeView}"
            v-for="mode in charactersView"
            :key="mode.id"
            @click="setActiveViewMode(mode.view)"
        >
            <span class="view-mode__icon" v-if="mode.icon">
                <inline-svg :src="SetIconSrc(mode.icon)"/>
            </span>
            <span class="view-mode__text" v-if="mode.text">{{mode.text}}</span>
        </li>
    </ul>
</template>
<script>
    import InlineSvg from 'vue-inline-svg';

    export default {
        name: 'AppDataView',
        components: {
            InlineSvg,
        },
        props: {
            activeView: {
                type: String,
                required: true,
            },
            charactersView: {
                type: Object,
                default: () => {},
                required: false,
            },
        },
        data() {
            return {

            };
        },
        methods: {
            SetIconSrc(name) {
                return require('@/assets/' + name + '.svg');
            },
            setActiveViewMode(mode) {
                this.$emit('setViewMode', mode);
            },
        },

    };
</script>
<style scoped lang="scss">
.view-mode {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0;
    margin: 20px 0;
    &__item {
        display: flex;
        align-items: center;
        border: none;
        outline: none;
        padding: 12px 16px;
        background-color: #f1f1f1;
        color: #333333;
        cursor: pointer;
        text-transform: none;
        &:not(:last-child) {
            margin-right: 20px;
        }
        &.active {
            background-color: #e06020;
            color: #ffffff;
            &:hover {
            transform: none;
        }
        }
    }
    &__icon {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        & svg {
            width: 20px;
            height: 20px;
            stroke: currentColor;
            fill: currentColor;
        }
    }
    &__text {
        font-size: 16px;
    }
}
</style>
