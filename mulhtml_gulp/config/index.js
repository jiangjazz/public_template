const env = process.env.NODE_ENV || 'development';

const config = function() {
  let dist = '';
  if (env === 'production') {
    // 生产
    dist = './build';
  } else {
    // 开发
    dist = './dist';
  }

  return {
    // src
    src: './src',
    // distsrc
    dist: dist,
    // hot server port
    port: 8080,
  }
} ()

module.exports = config;