import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UndoOutlined,
  CloudDownloadOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignBottomOutlined,
  FileTextOutlined,
  StopOutlined,
  CheckCircleOutlined,
  CloudUploadOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { CommonObj } from "@/vite-env";

export const btnsMap: CommonObj = {
  add: {
    name: "add",
    text: "新增",
    icon: <PlusOutlined />,
    order: 0,
    auth: [],
    attrs: {
      type: "primary",
      ghost: false,
    },
  },
  delete: {
    name: "delete",
    text: "删除",
    order: 1,
    auth: [0, 1, 2],
    icon: <DeleteOutlined />,
    attrs: {
      type: "primary",
      danger: true,
    },
    popconfirm: true,
  },
  edit: {
    name: "edit",
    text: "编辑",
    order: 2,
    auth: [0, 1, 2],
    icon: <EditOutlined />,
    attrs: {
      type: "primary",
      ghost: true,
    },
  },
  view: {
    name: "view",
    text: "查看",
    order: 3,
    auth: [],
    icon: <EyeOutlined />,
    attrs: {
      type: "primary",
      ghost: true,
    },
  },
  upload: {
    name: "upload",
    text: "上传",
    order: 4,
    auth: [0, 1, 2],
    icon: <CloudUploadOutlined />,
    attrs: {
      type: "primary",
    },
  },
  download: {
    name: "download",
    text: "下载",
    order: 5,
    auth: [],
    icon: <CloudDownloadOutlined />,
    attrs: {
      type: "primary",
      ghost: true,
    },
  },
  import: {
    name: "import",
    text: "导入",
    icon: <VerticalAlignTopOutlined />,
    order: 10,
    auth: [0, 1, 2],
    attrs: {
      type: "primary",
    },
  },
  export: {
    name: "export",
    text: "导出",
    icon: <VerticalAlignBottomOutlined />,
    order: 11,
    auth: [],
    attrs: {
      type: "primary",
      ghost: true,
    },
  },
  enable: {
    name: "enable",
    text: "启用",
    order: 12,
    auth: [0, 1, 2],
    icon: <CheckCircleOutlined />,
    attrs: {
      type: "primary",
    },
    popconfirm: true,
  },
  forbid: {
    name: "forbid",
    text: "禁用",
    order: 13,
    auth: [0, 1, 2],
    icon: <StopOutlined />,
    attrs: {
      type: "primary",
      ghost: true,
    },
    popconfirm: true,
  },
  repeal: {
    name: "repeal",
    text: "撤销",
    order: 20,
    auth: [0, 1, 2],
    icon: <UndoOutlined />,
    attrs: {
      type: "primary",
      ghost: true,
      danger: true,
    },
  },
  log: {
    name: "log",
    text: "日志",
    order: 21,
    auth: [],
    icon: <FileTextOutlined />,
    attrs: {
      type: "primary",
      ghost: true,
    },
  },
  submit: {
    name: "submit",
    text: "提交",
    order: 30,
    auth: [],
    icon: <CloudUploadOutlined />,
    attrs: {
      type: "primary",
      // ghost: true,
    },
  },
  reset: {
    name: "reset",
    text: "重置",
    order: 31,
    auth: [],
    icon: <RedoOutlined />,
    attrs: {
      type: "primary",
      ghost: true,
    },
  },
};
