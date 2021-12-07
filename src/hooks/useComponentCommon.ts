import { computed } from "vue";
import { pick } from "lodash-es";
import { TextComponentProps } from "@/utils/defaultProps";

const useComponentCommon = (
  props: Readonly<Partial<TextComponentProps>>,
  picks: string[]
) => {
  const styleProps = computed(() => pick(props, picks));
  const handlerClick = () => {
    if (props.actionType === "url" && props.url) {
      window.location.href = props.url;
    }
  };
  return {
    styleProps,
    handlerClick,
  };
};

export { useComponentCommon };
