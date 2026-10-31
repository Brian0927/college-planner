
export default {
  "id": "minor.mse",
  "type": "minor",
  "label": "材料科學工程學系",
  "short": "材料科學工程學系",
  "totalCredits": 20,
  "academicYear": 115,
  "source": "115 學年度查核之系網現行輔系辦法（修訂日期詳見資料來源）",
  "sourceUrl": "https://mse.site.nthu.edu.tw/var/file/298/1298/img/222727983.pdf",
  "tags": [
    {
      "id": "tag.minor-mse",
      "label": "輔系：材料科學工程學系",
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
          "id": "bkt.minor-mse",
          "label": "輔系：材料科學工程學系",
          "tags": [
            "tag.minor-mse"
          ],
          "minCredits": 20,
          "note": "須於主修最低學分之外加修；抵免依系辦核定"
        }
      ]
    }
  ],
  "subjectGroups": [
    {
      "id": "grp.minor.mse",
      "label": "材料科學工程學系輔系指定科目",
      "rule": {
        "type": "all"
      },
      "items": [
        {
          "name": "材料科學與工程一",
          "credit": 3,
          "tag": "tag.minor-mse"
        },
        {
          "name": "材料科學與工程二",
          "credit": 3,
          "tag": "tag.minor-mse"
        },
        {
          "name": "擴散與相變化",
          "credit": 3,
          "tag": "tag.minor-mse"
        }
      ]
    },
    {
      "id": "grp.minor.mse.elective",
      "label": "材料科學工程學系輔系選修（至少 11 學分）",
      "rule": {
        "type": "atLeastCredits",
        "n": 11
      },
      "items": [
        {
          "name": "工程數學一",
          "credit": 3,
          "tag": "tag.minor-mse"
        },
        {
          "name": "工程數學二",
          "credit": 3,
          "tag": "tag.minor-mse"
        },
        {
          "name": "材料熱力學一",
          "credit": 3,
          "tag": "tag.minor-mse"
        },
        {
          "name": "材料熱力學二",
          "credit": 3,
          "tag": "tag.minor-mse"
        },
        {
          "name": "晶體缺陷",
          "credit": 3,
          "tag": "tag.minor-mse"
        },
        {
          "name": "材料實驗一",
          "credit": 2,
          "tag": "tag.minor-mse"
        },
        {
          "name": "材料實驗二",
          "credit": 2,
          "tag": "tag.minor-mse"
        },
        {
          "name": "材料科技論壇",
          "credit": 1,
          "tag": "tag.minor-mse"
        },
        {
          "name": "機械性質",
          "credit": 3,
          "tag": "tag.minor-mse"
        },
        {
          "name": "材料之物理性質",
          "credit": 3,
          "tag": "tag.minor-mse"
        },
        {
          "name": "結晶繞射概論",
          "credit": 3,
          "tag": "tag.minor-mse"
        },
        {
          "name": "金屬材料",
          "credit": 3,
          "tag": "tag.minor-mse"
        },
        {
          "name": "電子材料",
          "credit": 3,
          "tag": "tag.minor-mse"
        },
        {
          "name": "陶瓷材料",
          "credit": 3,
          "tag": "tag.minor-mse"
        },
        {
          "name": "高分子材料",
          "credit": 3,
          "tag": "tag.minor-mse"
        },
        {
          "name": "生醫材料",
          "credit": 3,
          "tag": "tag.minor-mse"
        }
      ]
    }
  ]
};
