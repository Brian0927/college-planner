
export default {
  "id": "minor.qf",
  "type": "minor",
  "label": "計量財務金融學系",
  "short": "計量財務金融學系",
  "totalCredits": 20,
  "source": "115 學年度查核之計量財務金融學系現行輔系辦法",
  "tags": [
    {
      "id": "tag.minor-qf",
      "label": "輔系：計量財務金融學系",
      "color": "#5B4B8A"
    }
  ],
  "categories": [
    {
      "id": "cat.identity",
      "label": "其他身分",
      "color": "#5B4B8A",
      "minCredits": 20,
      "buckets": [
        {
          "id": "bkt.minor-qf",
          "label": "輔系：計量財務金融學系",
          "tags": [
            "tag.minor-qf"
          ],
          "minCredits": 20,
          "note": "須於主修最低學分之外，另加修至少 20 學分"
        }
      ]
    }
  ],
  "subjectGroups": [
    {
      "id": "grp.minor.qf",
      "label": "計量財務金融學系輔系指定科目（21 學分）",
      "note": "七門合計 21 學分須全修；校定額外學分門檻為 20，不能只修到 20 就視為完成。申請累計班排名須前 50%。",
      "rule": {
        "type": "all"
      },
      "defaultTag": "tag.minor-qf",
      "items": [
        {
          "name": "經濟學原理一",
          "credit": 3,
          "tag": "tag.minor-qf"
        },
        {
          "name": "經濟學原理二",
          "credit": 3,
          "tag": "tag.minor-qf"
        },
        {
          "name": "個體經濟學一",
          "credit": 3,
          "tag": "tag.minor-qf"
        },
        {
          "name": "財務管理",
          "credit": 3,
          "tag": "tag.minor-qf"
        },
        {
          "name": "衍生性金融市場",
          "credit": 3,
          "tag": "tag.minor-qf"
        },
        {
          "name": "統計學一",
          "credit": 3,
          "tag": "tag.minor-qf"
        },
        {
          "name": "統計學二",
          "credit": 3,
          "tag": "tag.minor-qf"
        }
      ]
    }
  ],
  "academicYear": 115,
  "sourceUrl": "https://qf.site.nthu.edu.tw/p/412-1366-5856.php"
};
