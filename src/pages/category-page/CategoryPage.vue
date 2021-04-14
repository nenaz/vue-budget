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
        <div :class="$style['body-content tess']">
          <div :class="$style['step-text-block']">
            <span :class="$style['step-sub-title']">{{ title }}</span>
          </div>
          <div :class="$style['category-margin']">
            <el-input
              placeholder="Наименование категории"
              v-model="categoryName"
              label="Наименование категории"
            />
          </div>
        </div>
        <div :class="$style.buttons">
          <el-button
            type="primary"
            :loading="requestInProgress"
            @click="handleAddCategory"
            :class="$style.button"
          >
            Добавить
          </el-button>
        </div>
      </div>
    </template>
  </page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import get from 'lodash.get';
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
    }),
    ...mapGetters([
      'getHasCard',
      'getAccountById',
    ]),
    titleWithStep() {
      return `Шаг: ${this.currentStep} из 3. `;
    },
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
      'getDictionary',
    ]),
    goBack() {
      this.$router.replace('/income');
    },
    async handleAddCategory() {
      await this.dictionaryItemAdd({
        categoryName: this.categoryName,
      });
      this.$router.push('/main');
    },
    async handleGetDictionary() {
      await this.getDictionary('category');
      this.$router.push('/main');
    },
    handleTypeSelect(value) {
      this.type = value;
    },
    handleCurrencySelect(value) {
      this.currency = value;
    },
    handlePositionSelect(value) {
      this.$store.commit('updatePosition', value);
    },
    handleSpecializationSelect(value) {
      this.$store.commit('updateSpecialization', value);
    },
    handleSelectAddress(suggestion) {
      this.address = suggestion.value;
    },
    handleSelectOrganization(suggestion) {
      this.organization = get(suggestion, 'value', '');
      this.address = get(suggestion, 'data.address.value', this.address);
    },
    prepareErrorParams() {
      return this.clientInstanceError
        ? {
          errorMessages: ErrorMessages(this.clientInstanceError),
        }
        : {};
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
  }

  .body {
    position: relative;

    .body-content {
      background: $WHITE;
      // backdrop-filter: blur(16px);
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
</style>
