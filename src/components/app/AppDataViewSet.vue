<template>
    <ul class="view-mode">
        <li
            class="view-mode__item link"
            :class="{'active': mode.view === activeView}"
            v-for="mode in charactersView"
            :key="mode.id"
            tabindex="1"
            role="button"
            @click="setActiveViewMode(mode.view)"
        >
            <button class="view-mode__btn btn--pseudo">
                <span class="view-mode__icon" v-if="mode.icon">
                    <inline-svg :src="SetIconSrc(mode.icon)"/>
                </span>
                <span class="view-mode__text" v-if="mode.text">{{mode.text}}</span>
            </button>

        </li>
    </ul>
</template>
<script>
    import InlineSvg from 'vue-inline-svg';

    export default {
        name: 'AppDataViewSet',
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
