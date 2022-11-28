
// キャッシュ名
var CACHE_NAME = 'pwa-test-caches';

//キャッシュするファイルの指定
var urlsToCache = [
	'index.html',
	'script.js',
	'style.css'
];

// インストール処理
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
});

//ServiceWorkerが有効になるときcacheNameがちがうキャッシュを削除する
self.addEventListener('activate',function(event){
  event.waitUntil(
    caches.keys().then(function(keyList){
      return Promise.all(keyList.map(function(key){
        if(key !== cacheName){
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

//キャッシュがあれば呼び出し、ない場合ネットワークから取りに行く
self.addEventListener('fetch',function(event){
  event.respondWith(
    caches.match(event.request).then(function(response){
      return response || fetch(event.request);
    })
  );
});
