<template>
  <div
    ref="Modal"
    class="modal fade"
    tabindex="-1"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">登入</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, toRefs, watch } from "vue";
import $ from "jquery";
export default {
  props: {
    modelValue: {
      type: Boolean,
      defalt: false,
    },
  },
  setup(props, target) {
    const { modelValue } = toRefs(props);

    const Modal = ref(null);

    onMounted(() => {
      $(Modal.value).on("hidden.bs.modal", () => {
        target.emit("update:modelValue", false);
      });
    });

    watch(modelValue, (newValue) => {
      $(Modal.value).modal(newValue ? "show" : "hide");
    });
    return { Modal };
  },
};
</script>

<style>
</style>