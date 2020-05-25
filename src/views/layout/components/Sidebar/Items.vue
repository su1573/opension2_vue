<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    nameEgl: {
      type: String,
      default: ""
    }
  },
  render(h, context) {
    const { icon, title, nameEgl } = context.props;
    const vnodes = [];

    if (icon) {
      vnodes.push(<i class={"icon fa " + icon} />);
    }

    if (title) {
      vnodes.push(<span slot="title">{title}</span>);
    }
    if (nameEgl) {
      vnodes.push(<span slot="nameEgl">{nameEgl}</span>);
    }
    return vnodes;
  }
};
</script>
