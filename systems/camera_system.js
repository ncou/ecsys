(function() {
  'use strict';

  Ecsys.Systems.CameraSystem = {
    componentTypes: ['Position', 'Size', 'Camera'],

    drawEntity: function(deltaTime, cameraEntity, components) {
      var context = this.game.getContext();

      var cameraPosition = components[0];
      var cameraSize = components[1];
      var camera = components[2];

      var cameraOffset = this.game.getComponent(cameraEntity, 'Offset') || { x: 0, y: 0 };

      var cameraPos = { x: cameraPosition.x - cameraOffset.x, y: cameraPosition.y - cameraOffset.y };

      context.save();

      context.beginPath();
      context.rect(camera.canvasX, camera.canvasY, cameraSize.width, cameraSize.height);
      context.clip();

      context.translate(camera.canvasX - cameraPos.x, camera.canvasY - cameraPos.y);

      this.game.forEachEntity(function(e, components) {
        var entityPosition = this.game.getComponent(e, 'Position');
        var entitySize = this.game.getComponent(e, 'Size');
        var entityOffset = this.game.getComponent(e, 'Offset') || { x: 0, y: 0 };

        var entityPos = { x: entityPosition.x - entityOffset.x, y: entityPosition.y - entityOffset.y };

        if (!(entityPos.x + entitySize.width <= cameraPos.x || entityPos.x >= cameraPos.x + cameraSize.width || entityPos.y + entitySize.height <= cameraPos.y || entityPosition.y >= cameraPos.y + cameraSize.height)) {
          var sprite;
          var image;

          if (sprite = this.game.getComponent(e, 'Sprite')) {
            var image = this.game.getImageCache().getImage(sprite.source);
          }

          if (image) {
            var imagePosition = { x: sprite.x || 0, y: sprite.y || 0 };
            var imageSize = { width: sprite.width || entitySize.width, height: sprite.height || entitySize.height };

            context.drawImage(image, imagePosition.x, imagePosition.y, imageSize.width, imageSize.height, entityPos.x, entityPos.y, entitySize.width, entitySize.height);
          }
          else {
            context.fillRect(entityPos.x, entityPos.y, entitySize.width, entitySize.height);
          }
        }
      }.bind(this), ['Position', 'Size', 'Sprite']);

      context.restore();

      context.strokeRect(camera.canvasX, camera.canvasY, cameraSize.width, cameraSize.height);
    }
  };
})();