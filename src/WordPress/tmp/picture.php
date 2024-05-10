<picture>
  <?php if ($args['spImg'] !== '') : ?>
    <?php if ($args['webp'] === 'true') : ?>
      <source srcset="<?php echo my_image_path() . $args['pictureImg'] . $args['spImgName'] ?>.webp" <?php if ($args['spWidth'] !== '') : ?>width="<?php echo $args['spWidth'] ?>" <?php endif; ?> <?php if ($args['spHeight'] !== '') : ?>height="<?php echo $args['spHeight'] ?>" <?php endif; ?> media="(max-width:767px)" type="image/webp">
    <?php endif; ?>
    <source srcset="<?php echo my_image_path() . $args['pictureImg'] . $args['spImgName'] . $args['file'] ?>" <?php if ($args['spWidth'] !== '') : ?>width="<?php echo $args['spWidth'] ?>" <?php endif; ?> <?php if ($args['spHeight'] !== '') : ?>height="<?php echo $args['spHeight'] ?>" <?php endif; ?> media="(max-width:767px)">
  <?php endif; ?>
  <?php if ($args['webp'] === 'true') : ?>
    <source srcset="<?php echo my_image_path() . $args['pictureImg'] ?>.webp" <?php if ($args['pcWidth'] !== '') : ?>width="<?php echo $args['pcWidth'] ?>" <?php endif; ?> <?php if ($args['pcHeight'] !== '') : ?>height="<?php echo $args['pcHeight'] ?>" <?php endif; ?> type="image/webp">
  <?php endif; ?>
  <img src="<?php echo my_image_path() . $args['pictureImg'] . $args['file'] ?>" alt="<?php echo $args['alt'] ?>" <?php if ($args['pcWidth'] !== '') : ?>width="<?php echo $args['pcWidth'] ?>" <?php endif; ?> <?php if ($args['pcHeight'] !== '') : ?>height="<?php echo $args['pcHeight'] ?>" <?php endif; ?> <?php if ($args['async'] === 'true') : ?>decoding="async" <?php endif; ?> <?php if ($args['lazy'] === 'true') : ?>loading="lazy" <?php endif; ?>>
</picture>

<?#php 以下を使用して呼び出し元のファイルで呼び出す ?>
<?#php
$args = [
  'pictureImg' => $officerList["img"],
  'spImg' => 'true',
  'spImgName' => '',
  'alt' => '',
  'file' => '.jpg',
  'webp' => 'true',
  'pcWidth' => '420',
  'pcHeight' => '420',
  'spWidth' => '150',
  'spHeight' => '150',
  'async' => 'true',
  'lazy' => 'true',
];
get_template_part('tmp/picture', null, $args);
?>