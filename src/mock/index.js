const Mock = require('mockjs')

module.exports = Mock.mock({
    'list|12': [
        {
            id: '@id',
            name: "@cname",
            "price|50-100": 0,
            "classify|1": ["西药", "中药"]

        }
    ]
})