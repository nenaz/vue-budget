<template>
  <page>
    <template v-slot:header>
      <page-header
        :showMenu="true"
        :showBack="true"
        title="Добавить категорию"
      />
    </template>
    <template v-slot:body>
      <div :class="$style.body">
        <el-select
          filterable
          allow-create
          v-model="categoryName"
          placeholder="Категория"
          :class="$style.button"
          @change="handleCategorySelect"
        >
          <el-option
            v-for="item in dictionaries.category"
            :key="item._id"
            :label="item.categoryName"
            :value="item.categoryName">
          </el-option>
        </el-select>
          <el-button-group
            :class="$style['group-button']"
            style="display: flex;"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              :disabled="!removeCandidate"
              @click="handleDeleteButton"
            ></el-button>
            <el-button
              type="primary"
              :loading="requestInProgress"
              @click="handleAddCategory"
              :class="$style['group-button-item']"
              :disabled="!isCanAdd"
            >
              Add
            </el-button>
          </el-button-group>
      </div>
    </template>
  </page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import Page from '@/components/Page';
import moneyFormat from '@/utils/money-formatter';
import PageHeader from '@/components/PageHeader';
import { ErrorMessages } from '@/utils/error-messages';

export default {
  name: 'CategoryPage',
  components: {
    Page,
    PageHeader,
  },
  data() {
    return {
      categoryName: '',
      category: {},
      removeCandidate: '',
      isCanAdd: false,
    };
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    edit: {
      type: String,
      default: '',
    },
    invest: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapFields({
      requestInProgress: 'requestInProgress',
      dictionaries: 'dictionaries',
    }),
    ...mapGetters([
      'getHasCard',
      'getAccountById',
    ]),
    isPageValid() {
      return this.name !== ''
        && this.number !== ''
        && this.type.title !== ''
        && this.amount !== 0;
    },
    titleBalance() {
      return moneyFormat(this.amount, true);
    },
    dictionaries() {
      return this.$store.state.dictionaries;
    },
  },
  async beforeMount() {
    if (this.edit === 'edit') {
      this.updateData();
    }
  },
  methods: {
    ...mapActions([
      'dictionaryItemAdd',
      'dictionaryItemDelete',
    ]),
    goBack() {
      this.$router.replace('/income');
    },
    async handleAddCategory() {
      if (this.category) {
        await this.dictionaryItemAdd({
          categoryName: this.categoryName,
        });
        this.$router.push('/main');
      }
    },
    prepareErrorParams() {
      return this.clientInstanceError
        ? {
          errorMessages: ErrorMessages(this.clientInstanceError),
        }
        : {};
    },
    handleCategorySelect(value) {
      this.categoryName = value;
      const currCategory = this.findCurrentCategory(value);
      const isAlreadyExists = !!currCategory;
      if (!isAlreadyExists) {
        this.isCanAdd = true;
        this.removeCandidate = '';
        this.category = {};
      } else {
        this.category = currCategory;
        this.removeCandidate = value;
      }
    },
    handleDeleteButton() {
      this.confirmOpen();
    },
    confirmOpen() {
      this.$confirm(`Будет удалена категория ${this.categoryName}! Продолжить?`, 'Внимание!', {
        confirmButtonText: 'Да',
        cancelButtonText: 'Нет',
        type: 'warning',
      }).then(async () => {
        await this.dictionaryItemDelete({
          // eslint-disable-next-line no-underscore-dangle
          categotyId: this.category._id,
        });
        this.$message({
          type: 'success',
          message: 'Удаление совершено',
        });
        this.$router.push('/main');
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Удаление отменено',
        });
      });
    },
    findCurrentCategory(name) {
      return this.dictionaries.category.find((item) => item.categoryName === name);
    },
  },
};
</script>

<style lang="scss" module>
  .category-margin {
    margin-bottom: 20px;
  }

  .button {
    width: 100%;
    margin: 20px 0;
  }

  .body {
    position: relative;

    .body-content {
      background: $WHITE;
      border-radius: 8px;
      width: 100%;
      height: 100%;
      padding: 23px 16px 5px;
      box-sizing: border-box;
      margin-bottom: 16px;

      .select {
        padding: 23px 15px 32px;
        box-sizing: border-box;

        .title {
          font-family: Squad;
          font-style: normal;
          font-weight: bold;
          font-size: 18px;
          line-height: 24px;
          text-align: center;
          color: $BLACK;
          display: inline-block;
          width: 100%;
          height: 24px;
          padding-bottom: 17px;
        }

        .slider {
          margin: 0px auto 35px;
        }
      }

      .buttons {
        width: 100%;
        bottom: 0;

        .custom {
          border-radius: 0px 0px 8px 8px;
          margin: 0;
          height: 72px;
        }
      }
    }

  }

  .step-text-block {
    display: flex;
    flex-direction: column;
    padding-top: 3px;
    text-align: left;

    .step-title {
      font-family: Squad;
      font-style: normal;
      font-size: 18px;
      line-height: 24px;
      color: $BLACK;
    }

    .step-sub-title {
      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      color: #494949;
      margin-bottom: 15px;
    }
  }

  .work-info {
    margin-bottom: 47px;
  }

  .input-placeholder {
    margin-bottom: 24px;
  }

  .dictionary-item-block {
    height: 86px;
  }

  .dictionary-item-text {
    z-index: 99999;
    font-family: Source Sans Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #808080;
    top: -19px;
    font-size: 12px;
    line-height: 20px;
    display: inline-block;
    text-align: left;
    width: 100%;
  }

  .group-button-item {
    width: 100%;
  }
</style>
