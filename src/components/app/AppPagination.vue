<template>
    <div class="pagination">
        <div class="pagination__total">
            total pages: {{ pages }}
        </div>
        <div class="pagination__list">
            <div class="pagination__item">

                <a
                    rel="prev"
                    class="pagination__link"
                    :class="{ 'pagination__link--disabled': !hasPrev}"
                    @click="changePage(paginationCurrent - 1)"
                >
                    <span>Prev</span>
                </a>
            </div>

            <div class="pagination__item pagination__item--current">

                <span>page {{paginationCurrent}}</span>
            </div>

            <div class="pagination__item">
                <a
                    rel="next"
                    class="pagination__link"
                    :class="{ 'pagination__link--disabled': !hasNext }"
                    @click="changePage(paginationCurrent + 1)"
                >
                    <span>Next</span>
                </a>
            </div>

            <div class="pagination__item pagination__item--page">
                <input
                    class="pagination__link pagination__input"
                    type="number"
                    v-model.number="inputPageNumber"
                    placeholder="Enter page"
                    @keyup.enter="changePageFromInput(inputPageNumber, $event)"
                />
                <a
                    class="pagination__link"
                    @click.prevent="changePageFromInput(inputPageNumber)"
                >
                    <span>go to</span>
                </a>
            </div>
        </div>

    </div>
</template>
<script>
    import {DEEP_CLONE} from '@/utils/constants';

    const paginationDefault = {
        total: 1,
        first: 1,
        last: 1,
        current: 1,
    };
    export default {
        name: 'AppPagination',
        components: {
        },
        props: {
            pages: {
                type: Number,
                default: 1,
            },
            paginationCurrent: {
                type: Number,
                default: 1,
            },
        },
        data() {
            return {
                pagination: DEEP_CLONE(paginationDefault),
                inputPageNumber: null,
            };
        },

        created() {
            this.pagination.total = this.pages;
            this.pagination.current = this.paginationCurrent;
            this.pagination.last = this.pages;
        },

        computed: {
            hasPrev() {
                return this.paginationCurrent > 1;
            },
            hasNext() {
                return this.pagination.last > this.paginationCurrent;
            },
        },

        methods: {

            changePage(page) {
                if (page < 1 || page > this.pagination.last) return;

                this.$emit('changePage', page);
            },

            changePageFromInput(page, event) {
                this.changePage(page);
                this.inputPageNumber = '';
                event.target.blur();
            },
            checkInput(event) {
                const newValue = parseInt(event.target.value, 10);

                if (newValue > this.pagination.last) {
                    this.inputPageNumber = this.pagination.last;
                }
                else if (newValue < 1) {
                    this.inputPageNumber = 1;
                }

                this.$emit('changePage', this.inputPageNumber);
            },

        },
    };
</script>

<style scoped lang="scss">
.pagination {
    &__total {
        font-size: 20px;
        margin-bottom: 10px;
    }
    &__list {
        display: flex;
        align-items: center;
    }
    &__item {
        font-size: 18px;
        line-height: 22px;
        &:not(:last-child) {
            margin-right: 25px;
        }
        &--page {
            display: flex;
            align-items: center;
            margin-left: 15px;
        }
    }
    &__link {
        color: #ffffff;
        cursor: pointer;
        font-weight: bold;
        font-size: 18px;
        line-height: 22px;
        &--disabled {
            color: #373737;
            cursor: default;
        }
    }
    &__input {
        width: 150px;
        height: 40px;
        padding: 10px;
        position: relative;
        background-color: transparent;
        border-radius: 4px;
        border: 1px solid #373737;
        color: white;
        margin-right: 10px;
    }
}
</style>
