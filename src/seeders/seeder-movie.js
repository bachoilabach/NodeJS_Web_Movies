"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("movie", [
      {
        title: "Kẻ đánh cắp giấc mơ",
        description: `Kẻ trộm giấc mơ là một bộ phim điện ảnh Anh Mỹ thuộc thể loại hành động – khoa học viễn tưởng ra mắt năm 2010 do Christopher Nolan làm đạo diễn, viết kịch bản và đồng sản xuất.`,
        countryID: 1,
        release: "2010-07-16",
        duration: 1,
        thumbnail: "anh nen",
        videoURL: "none",
        html: "ytb",
        imdb: 7.8,
        background: "none",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Kẻ hủy diệt",
        description:
          "Kẻ hủy diệt là một bộ phim khoa học viễn tưởng của Mỹ về một người máy từ tương lai được gửi về quá khứ để sát hại một phụ nữ có con trai sẽ trở thành người cứu thế nhân loại.",
        countryID: 1,
        release: "1984-10-26",
        duration: 1,
        thumbnail: "anh nen",
        videoURL: "none",
        html: "ytb",
        imdb: 8.0,
        background: "none",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Công viên kỷ Jura",
        description:
          "Công viên kỷ Jura là bộ phim điện ảnh khoa học viễn tưởng Mỹ nói về công viên giải trí với các loài khủng long đã được tái tạo thông qua công nghệ gen.",
        countryID: 1,
        release: "1993-06-11",
        duration: 1,
        thumbnail: "anh nen",
        videoURL: "none",
        html: "ytb",
        imdb: 8.1,
        background: "none",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Vua sư tử",
        description:
          "Vua sư tử là một bộ phim hoạt hình của Mỹ kể về cuộc đời của chú sư tử Simba, người thừa kế ngai vàng của cha mình, nhà vua Mufasa.",
        countryID: 1,
        release: "1994-06-24",
        duration: 1,
        thumbnail: "anh nen",
        videoURL: "none",
        html: "ytb",
        imdb: 8.5,
        background: "none",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Chạng vạng",
        description:
          "Chạng vạng là bộ phim tình cảm lãng mạn Mỹ kể về câu chuyện tình yêu giữa cô gái trẻ Bella Swan và Edward Cullen, một ma cà rồng.",
        countryID: 1,
        release: "2008-11-21",
        duration: 1,
        thumbnail: "anh nen",
        videoURL: "none",
        html: "ytb",
        imdb: 5.2,
        background: "none",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Di sản trăm năm",
        description:
          "Di sản trăm năm là bộ phim khoa học viễn tưởng Mỹ xoay quanh những cuộc phiêu lưu của một nhóm các nhà khoa học khi tìm hiểu về sự sống ngoài Trái đất.",
        countryID: 1,
        release: "2017-10-06",
        duration: 1,
        thumbnail: "anh nen",
        videoURL: "none",
        html: "ytb",
        imdb: 7.0,
        background: "none",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Lâu đài trong bầu trời",
        description:
          "Phim kể về hành trình phiêu lưu kỳ thú của cô bé Sheeta và cậu bé Pazu để tìm kiếm huyền thoại lâu đài Laputa trên trời.",
        countryID: 1,
        release: "1986-08-02",
        duration: 1,
        thumbnail: "anh nen",
        videoURL: "none",
        html: "ytb",
        imdb: 8.1,
        background: "none",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Kiki - Giao hàng phù thủy",
        description:
          "Câu chuyện xoay quanh cô bé phù thủy 13 tuổi Kiki và cuộc phiêu lưu một mình trong thế giới mới, nơi cô bắt đầu dịch vụ giao hàng của mình.",
        countryID: 1,
        release: "1989-07-29",
        duration: 1,
        thumbnail: "anh nen",
        videoURL: "none",
        html: "ytb",
        imdb: 7.9,
        background: "none",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Cuộc phiêu lưu của Chihiro đến thế giới linh hồn",
        description:
          "Đây là câu chuyện về cô bé Chihiro và cuộc hành trình của cô trong thế giới ma thuật nhằm giải cứu cha mẹ mình.",
        countryID: 1,
        release: "2001-07-20",
        duration: 1,
        thumbnail: "anh nen",
        videoURL: "none",
        html: "ytb",
        imdb: 8.6,
        background: "none",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Kẻ săn mồi vùng vắng",
        description:
          "Bộ phim kể về cuộc đấu trí giữa một nhóm bạn bè với một kẻ giết người hàng loạt trong một thị trấn nhỏ, tách biệt.",
        countryID: 1,
        release: "2011-10-20",
        duration: 1,
        thumbnail: "anh nen",
        videoURL: "none",
        html: "ytb",
        imdb: 6.5,
        background: "none",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Hồi chuông tử thần",
        description:
          "Một bộ phim kinh dị tâm lý, nói về một người đàn ông bị ám ảnh bởi âm thanh của một chiếc chuông cổ, được cho là mang lại cái chết cho người nghe thấy nó.",
        countryID: 1,
        release: "2013-08-03",
        duration: 1,
        thumbnail: "anh nen",
        videoURL: "none",
        html: "ytb",
        imdb: 7.2,
        background: "none",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Bóng ma trong nhà hát",
        description:
          "Phim theo chân một nhóm sinh viên điều tra câu chuyện ma ám nổi tiếng của một nhà hát bị bỏ hoang, thách thức các huyền thoại đô thị đầy rùng rợn.",
        countryID: 1,
        release: "2018-05-18",
        duration: 1,
        thumbnail: "anh nen",
        videoURL: "none",
        html: "ytb",
        imdb: 6.8,
        background: "none",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
