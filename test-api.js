const http = require('http');

// Test function untuk check API endpoints
function testEndpoint(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(body);
          resolve({
            statusCode: res.statusCode,
            data: jsonData
          });
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            data: body
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Test endpoints
async function runTests() {
  console.log('Testing OpenMusic API endpoints...\n');
  
  try {
    // Test root endpoint
    console.log('1. Testing root endpoint (/)');
    const rootTest = await testEndpoint('/');
    console.log(`   Status: ${rootTest.statusCode}`);
    console.log(`   Response:`, rootTest.data);
    console.log('');

    // Test albums endpoint
    console.log('2. Testing albums endpoint (/albums)');
    const albumsTest = await testEndpoint('/albums');
    console.log(`   Status: ${albumsTest.statusCode}`);
    console.log(`   Response:`, albumsTest.data);
    console.log('');

    // Test songs endpoint
    console.log('3. Testing songs endpoint (/songs)');
    const songsTest = await testEndpoint('/songs');
    console.log(`   Status: ${songsTest.statusCode}`);
    console.log(`   Response:`, songsTest.data);
    console.log('');

    // Test 404 endpoint
    console.log('4. Testing non-existent endpoint (/nonexistent)');
    const notFoundTest = await testEndpoint('/nonexistent');
    console.log(`   Status: ${notFoundTest.statusCode}`);
    console.log(`   Response:`, notFoundTest.data);
    
  } catch (error) {
    console.error('Test failed:', error.message);
    console.log('\nMake sure the server is running on http://localhost:5000');
  }
}

// Run tests
runTests();
