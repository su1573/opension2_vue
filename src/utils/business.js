const business = {
    //追偿结果
    recoveryResult: [
        {label: "正在追偿", value: "underWay"},
        {label: "追偿成功", value: "successful"},
        {label: "追偿失败", value: "failure"},
        {label: "放弃追偿", value: "givenUp"},
    ],
    //对方赔案号类型
    claimRefType: [
        {label: "保单号", value: "PolicyNumber"},
        {label: "经纪公司赔案编号", value: "BrokerRefNumber"},
        {label: "分出公司赔案编号", value: "CedentRefNumber"},
        {label: "其他", value: "OtherRefNumber"},
    ],
    //任务进度
    taskName: [
        {label: "待分配", value: "待分配"},
        {label: "待审核", value: "待审核"},
        {label: "待一级复核", value: "待一级复核"},
        {label: "待二级复核", value: "待二级复核"},
        {label: "待三级复核", value: "待三级复核"},
        {label: "待签回", value: "待签回"},
        {label: "已关闭", value: "已关闭"}
    ],
    //业务来源
    bizComeFrom: [
        {label: "Domestic", value: "DOM"},
        {label: "International", value: "INT"}
    ],
    //baseCompany
    baseCompany: [
        {label: "China Re P&C", value: "BP1"},
        {label: "China Re Group", value: "BP2"},
        /*{label: "新加坡分公司", value: "XJPFGS"}*/
    ],
    processType: [
        //{label: "正常理赔流程", value: "type_1"},
        {label: "资料存档", value: "type_2"},
        {label: "修改赔案信息", value: "type_3"},
        {label: "Reverse账单", value: "type_4"},
        {label: "历史赔案未决更新", value: "type_5"},
        {label: "历史赔案赔款付款", value: "type_6"},
        {label: "新建赔案", value: "type_7"},
    ]
}
export default {
    business,
    getLabelByValue:
        (type, val) => {
            let arr = [];
            switch (type) {
                case "recoveryResult":
                    arr = business.recoveryResult;
                    break;
                case "claimRefType":
                    arr = business.claimRefType;
                    break;
                case "bizComeFrom":
                    arr = business.bizComeFrom;
                    break;
                case "baseCompany":
                    arr = business.baseCompany;
                    break;
                case "processType":
                    arr = business.processType;
                    break;


            }
            const res = arr.find(item => {
                if (item.value === val) {
                    return true
                }
            });
            return res ? res.label : "";
        }
}

