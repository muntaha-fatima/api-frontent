module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/coupons',
        destination: 'https://coupon-app-backend.vercel.app/api/coupons',
      },
    ];
  },
};
