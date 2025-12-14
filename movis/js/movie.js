// js/movie.js
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有购票按钮
    const buyButtons = document.querySelectorAll('.buy-ticket-btn');
    
    // 为每个按钮添加点击事件
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 获取当前电影卡片的电影名称（从data属性中）
            const movieCard = this.closest('.movie-card');
            const movieName = movieCard.getAttribute('data-movie-name');
            
            // 跳转到购票页，并通过URL参数传递电影名称
            // 编码电影名称，防止特殊字符导致的问题
            window.location.href = `电影购票.html?movie=${encodeURIComponent(movieName)}`;
        });
    });
});