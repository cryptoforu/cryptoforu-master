const Ziggy = {
  "url": "http:\/\/localhost", "port": null, "defaults": {}, "routes": {
    "imagecache": {
      "uri": "api\/img\/cache\/{template}\/{filename}",
      "methods": ["GET", "HEAD"],
      "wheres": {"filename": "[ \\w\\.\\\/\\-\\@\\(\\)\\=]+"}
    },
    "login": {"uri": "admin\/login", "methods": ["GET", "HEAD"]},
    "logout": {"uri": "admin\/logout", "methods": ["POST"]},
    "password.request": {
      "uri": "admin\/forgot-password",
      "methods": ["GET", "HEAD"]
    },
    "password.reset": {
      "uri": "admin\/reset-password\/{token}",
      "methods": ["GET", "HEAD"]
    },
    "password.email": {"uri": "admin\/forgot-password", "methods": ["POST"]},
    "password.update": {"uri": "admin\/reset-password", "methods": ["POST"]},
    "register": {"uri": "admin\/register", "methods": ["GET", "HEAD"]},
    "verification.notice": {
      "uri": "admin\/email\/verify",
      "methods": ["GET", "HEAD"]
    },
    "verification.verify": {
      "uri": "admin\/email\/verify\/{id}\/{hash}",
      "methods": ["GET", "HEAD"]
    },
    "verification.send": {
      "uri": "admin\/email\/verification-notification",
      "methods": ["POST"]
    },
    "user-profile-information.update": {
      "uri": "admin\/user\/profile-information",
      "methods": ["PUT"]
    },
    "user-password.update": {
      "uri": "admin\/user\/password",
      "methods": ["PUT"]
    },
    "password.confirmation": {
      "uri": "admin\/user\/confirmed-password-status",
      "methods": ["GET", "HEAD"]
    },
    "password.confirm": {
      "uri": "admin\/user\/confirm-password",
      "methods": ["POST"]
    },
    "two-factor.login": {
      "uri": "admin\/two-factor-challenge",
      "methods": ["GET", "HEAD"]
    },
    "two-factor.enable": {
      "uri": "admin\/user\/two-factor-authentication",
      "methods": ["POST"]
    },
    "two-factor.confirm": {
      "uri": "admin\/user\/confirmed-two-factor-authentication",
      "methods": ["POST"]
    },
    "two-factor.disable": {
      "uri": "admin\/user\/two-factor-authentication",
      "methods": ["DELETE"]
    },
    "two-factor.qr-code": {
      "uri": "admin\/user\/two-factor-qr-code",
      "methods": ["GET", "HEAD"]
    },
    "two-factor.secret-key": {
      "uri": "admin\/user\/two-factor-secret-key",
      "methods": ["GET", "HEAD"]
    },
    "two-factor.recovery-codes": {
      "uri": "admin\/user\/two-factor-recovery-codes",
      "methods": ["GET", "HEAD"]
    },
    "sanctum.csrf-cookie": {
      "uri": "sanctum\/csrf-cookie",
      "methods": ["GET", "HEAD"]
    },
    "telescope": {
      "uri": "telescope\/{view?}",
      "methods": ["GET", "HEAD"],
      "wheres": {"view": "(.*)"}
    },
    "ignition.healthCheck": {
      "uri": "_ignition\/health-check",
      "methods": ["GET", "HEAD"]
    },
    "ignition.executeSolution": {
      "uri": "_ignition\/execute-solution",
      "methods": ["POST"]
    },
    "ignition.updateConfig": {
      "uri": "_ignition\/update-config",
      "methods": ["POST"]
    },
    "site:home": {
      "uri": "api\/site\/{site}",
      "methods": ["GET", "HEAD"],
      "bindings": {"site": "data_name"}
    },
    "site:breadcrumbs": {
      "uri": "api\/site\/shared\/breadcrumbs",
      "methods": ["GET", "HEAD"]
    },
    "site:meta_data": {
      "uri": "api\/site\/shared\/meta-data",
      "methods": ["GET", "HEAD"]
    },
    "blog:search": {"uri": "api\/blog\/search", "methods": ["GET", "HEAD"]},
    "blog:index": {"uri": "api\/blog", "methods": ["GET", "HEAD"]},
    "blog:latest": {"uri": "api\/blog\/latest", "methods": ["GET", "HEAD"]},
    "blog:category": {
      "uri": "api\/blog\/{category}\/posts",
      "methods": ["GET", "POST", "HEAD"],
      "bindings": {"category": "slug"}
    },
    "blog:post": {
      "uri": "api\/blog\/{category}\/posts\/{post}",
      "methods": ["GET", "HEAD"],
      "bindings": {"category": "slug", "post": "slug"}
    },
    "blog:tags": {"uri": "api\/blog\/tags", "methods": ["GET", "HEAD"]},
    "crypto:index": {"uri": "api\/crypto", "methods": ["GET", "HEAD"]},
    "crypto:search": {"uri": "api\/crypto\/search", "methods": ["GET", "HEAD"]},
    "crypto:show": {
      "uri": "api\/crypto\/coins\/{crypto}",
      "methods": ["GET", "HEAD"],
      "bindings": {"crypto": "symbol"}
    },
    "crypto:gainers_losers": {
      "uri": "api\/crypto\/gainers-losers",
      "methods": ["GET", "HEAD"]
    },
    "crypto:categories": {
      "uri": "api\/crypto\/categories\/{category}",
      "methods": ["GET", "HEAD"],
      "bindings": {"category": "id"}
    },
    "earn:earn_categories": {
      "uri": "api\/earn\/earn_categories",
      "methods": ["GET", "HEAD"]
    },
    "earn:earn_data": {
      "uri": "api\/earn\/earn-methods",
      "methods": ["GET", "HEAD"]
    },
    "faucetpay:list": {
      "uri": "api\/faucetpay\/list\/categories\/{listCategory}",
      "methods": ["GET", "HEAD"],
      "bindings": {"listCategory": "symbol"}
    },
    "faucetpay:list_categories": {
      "uri": "api\/faucetpay\/list\/categories",
      "methods": ["GET", "HEAD"]
    },
    "faucetpay:stats": {
      "uri": "api\/faucetpay\/list\/stats",
      "methods": ["GET", "HEAD"]
    },
    "faucetpay:search": {
      "uri": "api\/faucetpay\/search",
      "methods": ["GET", "HEAD"]
    },
    "placeholder": {
      "uri": "api\/placeholder\/{width}\/{height}",
      "methods": ["GET", "HEAD"]
    },
    "count_views": {
      "uri": "api\/count-views\/{post}",
      "methods": ["GET", "HEAD"],
      "bindings": {"post": "slug"}
    },
    "test": {"uri": "api\/test", "methods": ["GET", "HEAD"]},
    "ziggy": {"uri": "api\/ziggy", "methods": ["GET", "HEAD"]},
    "admin:dashboard": {"uri": "admin", "methods": ["GET", "HEAD"]},
    "admin:settings:index": {
      "uri": "admin\/settings",
      "methods": ["GET", "HEAD"]
    },
    "admin:settings:create": {
      "uri": "admin\/settings\/create",
      "methods": ["GET", "HEAD"]
    },
    "admin:settings:action": {
      "uri": "admin\/settings\/{action}",
      "methods": ["POST"]
    },
    "admin:settings:store": {"uri": "admin\/settings", "methods": ["POST"]},
    "admin:settings:menu": {
      "uri": "admin\/settings\/menu\/{admin_settings}",
      "methods": ["PUT", "PATCH"]
    },
    "admin:settings:destroy": {
      "uri": "admin\/settings\/{admin_settings}",
      "methods": ["DELETE"]
    },
    "admin:settings:page.update": {
      "uri": "admin\/settings\/{page}",
      "methods": ["PUT"],
      "bindings": {"page": "id"}
    },
    "admin:settings:add.settings": {
      "uri": "admin\/settings\/create",
      "methods": ["POST"]
    },
    "admin:blog:status": {
      "uri": "admin\/blog\/{post}",
      "methods": ["PUT", "PATCH"],
      "bindings": {"post": "slug"}
    },
    "admin:blog:post.index": {
      "uri": "admin\/blog\/post",
      "methods": ["GET", "HEAD"]
    },
    "admin:blog:post.create": {
      "uri": "admin\/blog\/post\/create",
      "methods": ["GET", "HEAD"]
    },
    "admin:blog:post.store": {"uri": "admin\/blog\/post", "methods": ["POST"]},
    "admin:blog:post.show": {
      "uri": "admin\/blog\/post\/{post}",
      "methods": ["GET", "HEAD"]
    },
    "admin:blog:post.edit": {
      "uri": "admin\/blog\/post\/{post}\/edit",
      "methods": ["GET", "HEAD"],
      "bindings": {"post": "slug"}
    },
    "admin:blog:post.update": {
      "uri": "admin\/blog\/post\/{post}",
      "methods": ["PUT", "PATCH"],
      "bindings": {"post": "slug"}
    },
    "admin:blog:post.destroy": {
      "uri": "admin\/blog\/post\/{post}",
      "methods": ["DELETE"],
      "bindings": {"post": "slug"}
    },
    "admin:blog:category.index": {
      "uri": "admin\/blog\/category",
      "methods": ["GET", "HEAD"]
    },
    "admin:blog:category.create": {
      "uri": "admin\/blog\/category\/create",
      "methods": ["GET", "HEAD"]
    },
    "admin:blog:category.store": {
      "uri": "admin\/blog\/category",
      "methods": ["POST"]
    },
    "admin:blog:category.show": {
      "uri": "admin\/blog\/category\/{category}",
      "methods": ["GET", "HEAD"],
      "bindings": {"category": "slug"}
    },
    "admin:blog:category.edit": {
      "uri": "admin\/blog\/category\/{category}\/edit",
      "methods": ["GET", "HEAD"],
      "bindings": {"category": "slug"}
    },
    "admin:blog:category.update": {
      "uri": "admin\/blog\/category\/{category}",
      "methods": ["PUT", "PATCH"],
      "bindings": {"category": "slug"}
    },
    "admin:blog:category.destroy": {
      "uri": "admin\/blog\/category\/{category}",
      "methods": ["DELETE"],
      "bindings": {"category": "slug"}
    },
    "admin:library.process": {"uri": "admin\/library", "methods": ["POST"]},
    "admin:library.destroyMultiple": {
      "uri": "admin\/library",
      "methods": ["DELETE"]
    },
    "admin:library.index": {
      "uri": "admin\/library\/library",
      "methods": ["GET", "HEAD"]
    },
    "admin:library.create": {
      "uri": "admin\/library\/library\/create",
      "methods": ["GET", "HEAD"]
    },
    "admin:library.store": {
      "uri": "admin\/library\/library",
      "methods": ["POST"]
    },
    "admin:library.show": {
      "uri": "admin\/library\/library\/{library}",
      "methods": ["GET", "HEAD"],
      "bindings": {"library": "id"}
    },
    "admin:library.edit": {
      "uri": "admin\/library\/library\/{library}\/edit",
      "methods": ["GET", "HEAD"],
      "bindings": {"library": "id"}
    },
    "admin:library.update": {
      "uri": "admin\/library\/library\/{library}",
      "methods": ["PUT", "PATCH"],
      "bindings": {"library": "id"}
    },
    "admin:library.destroy": {
      "uri": "admin\/library\/library\/{library}",
      "methods": ["DELETE"],
      "bindings": {"library": "id"}
    },
    "admin:earn.index": {"uri": "admin\/earn", "methods": ["GET", "HEAD"]},
    "admin:earn.create": {
      "uri": "admin\/earn\/create",
      "methods": ["GET", "HEAD"]
    },
    "admin:earn.store": {"uri": "admin\/earn", "methods": ["POST"]},
    "admin:earn.show": {
      "uri": "admin\/earn\/{earn}",
      "methods": ["GET", "HEAD"],
      "bindings": {"earn": "id"}
    },
    "admin:earn.edit": {
      "uri": "admin\/earn\/{earn}\/edit",
      "methods": ["GET", "HEAD"],
      "bindings": {"earn": "id"}
    },
    "admin:earn.update": {
      "uri": "admin\/earn\/{earn}",
      "methods": ["PUT", "PATCH"],
      "bindings": {"earn": "id"}
    },
    "admin:earn.destroy": {
      "uri": "admin\/earn\/{earn}",
      "methods": ["DELETE"],
      "bindings": {"earn": "id"}
    },
    "admin:site.delete": {"uri": "admin\/site\/delete", "methods": ["POST"]},
    "admin:site.index": {"uri": "admin\/site", "methods": ["GET", "HEAD"]},
    "admin:site.create": {
      "uri": "admin\/site\/create",
      "methods": ["GET", "HEAD"]
    },
    "admin:site.store": {"uri": "admin\/site", "methods": ["POST"]},
    "admin:site.show": {
      "uri": "admin\/site\/{site}",
      "methods": ["GET", "HEAD"]
    },
    "admin:site.edit": {
      "uri": "admin\/site\/{site}\/edit",
      "methods": ["GET", "HEAD"]
    },
    "admin:site.update": {
      "uri": "admin\/site\/{site}",
      "methods": ["PUT", "PATCH"]
    },
    "admin:site.destroy": {"uri": "admin\/site\/{site}", "methods": ["DELETE"]},
    "admin:profile": {"uri": "admin\/profile", "methods": ["GET", "HEAD"]}
  }
};

if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
  Object.assign(Ziggy.routes, window.Ziggy.routes);
}

export {Ziggy};
