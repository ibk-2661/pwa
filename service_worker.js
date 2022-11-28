
// キャッシュ名
var cacheName = 'pwa-test-caches';

//キャッシュするファイルの指定
var cacheFiles = [
	'script.js',
	'style.css'
];

// インストール処理
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(cacheName).then(function(cache) {
			return cache.addAll(cacheFiles);
		})
	);
});

//ServiceWorkerが有効になるときにcacheNameが違うキャッシュを削除する
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
