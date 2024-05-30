// キッチンカーのデータ
const foodTrucks = [
  {
      id: 1,
      name: "わかのキッチンカー",
      location: "コラーニングハウス前",
      hours: "11:00 - 14:00",
      cuisine: "ゲロ",
      image: "demo.jpg",
      reviews: [
          { username: "哲太郎", rating: 2, comment: "料理がゲロみたいで美味しかったですが、少し高かったです。" },
          // 追加のレビュー
      ]
  },
  {
      id: 2,
      name: "よしおかのキッチンカー",
      location: "B棟グランドホール前",
      hours: "11:00 - 15:00",
      cuisine: "洋食",
      image: "demo.jpg",
      reviews: [
          { username: "寛", rating: 5, comment: "とても美味しかったです！" },
          // 追加のレビュー
      ]
  },
  {
      id: 3,
      name: "ひろきのキッチンカー",
      location: "B棟ホワイエ前",
      hours: "10:00 - 13:00",
      cuisine: "中華",
      image: "demo.jpg",
      reviews: [
          { username: "浩一", rating: 4, comment: "満足じゃ～" },
          // 追加のレビュー
      ]
  }
];

// キッチンカーの詳細を表示
function displayFoodTruckDetails(truckId) {
  const truck = foodTrucks.find(t => t.id == truckId);
  if (!truck) return;

  const detailsSection = document.getElementById('food-truck-details');
  const listSection = document.getElementById('food-truck-list');
    listSection.style.display = 'none';
    detailsSection.style.display = 'block';


  detailsSection.innerHTML = `
      <button id="back-button">一覧へ</button>
      <h2>${truck.name}</h2>
      <div class="food-truck-details">
          <img src="${truck.image}" alt="${truck.name}の画像">
          <p>所在地: ${truck.location}</p>
          <p>営業時間: ${truck.hours}</p>
          <p>料理の種類: ${truck.cuisine}</p>
      </div>
      <div class="reviews">
          <h3>レビュー</h3>
          <div class="review-list">
              ${truck.reviews.map(review => `
                  <div class="review">
                      <p><strong>ユーザー名:</strong> ${review.username}</p>
                      <p><strong>評価:</strong> ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
                      <p><strong>コメント:</strong> ${review.comment}</p>
                  </div>
              `).join('')}
          </div>
      </div>
      <div class="add-review">
          <h3>レビューを追加する</h3>
          <form id="review-form">
              <label for="username">ユーザー名:</label>
              <input type="text" id="username" name="username" required>
              <label for="rating">評価:</label>
              <select id="rating" name="rating" required>
                  <option value="1">★☆☆☆☆</option>
                  <option value="2">★★☆☆☆</option>
                  <option value="3">★★★☆☆</option>
                  <option value="4">★★★★☆</option>
                  <option value="5">★★★★★</option>
              </select>
              <label for="comment">コメント:</label>
              <textarea id="comment" name="comment" required></textarea>
              <button type="submit">送信</button>
          </form>
      </div>
  `;
   // 戻るボタンのイベントリスナー
   document.getElementById('back-button').addEventListener('click', function() {
    listSection.style.display = 'block';
    detailsSection.style.display = 'none';
});

  // レビューの追加機能
  document.getElementById('review-form').addEventListener('submit', function(event) {
      event.preventDefault();

      const username = document.getElementById('username').value;
      const rating = document.getElementById('rating').value;
      const comment = document.getElementById('comment').value;

      const newReview = document.createElement('div');
      newReview.classList.add('review');
      newReview.innerHTML = `
          <p><strong>ユーザー名:</strong> ${username}</p>
          <p><strong>評価:</strong> ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</p>
          <p><strong>コメント:</strong> ${comment}</p>
      `;

      document.querySelector('.review-list').appendChild(newReview);
      document.getElementById('review-form').reset();
  });
}

// キッチンカー一覧のリンクにイベントリスナーを追加
document.querySelectorAll('.food-truck-list a').forEach(link => {
  link.addEventListener('click', function(event) {
      event.preventDefault();
      const truckId = this.getAttribute('data-truck-id');
      displayFoodTruckDetails(truckId);
  });
});
