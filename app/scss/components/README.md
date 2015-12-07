# Components

For small components, there is the `components/` folder. While `layout/` is macro (defining the global wireframe), `components/` is more focused on widgets. It contains all kind of specific modules like a slider, a loader, a widget, and basically anything along those lines. There are usually a lot of files in components/ since the whole site/application should be mostly composed of tiny modules.

Reference: [Sass Guidelines](http://sass-guidelin.es/) > [Architecture](http://sass-guidelin.es/#architecture) > [Components folder](http://sass-guidelin.es/#components-folder)

// Configuration variables
// Type name | color scheme
$message-types: (
  error : #b94a48,
  warn  : #c09853,
  valid : #468847,
  info  : #3a87ad
) !default;
 
// Placeholder for static values
%message {
	  padding: .5em;
	  margin: .5em;
	  border-radius: .15em;
	  border: 1px solid;
}
 
// Mixin for dynamic values
// Extending the placeholder
@mixin message($color) {
  @extend %message;
  color: $color;
  background: lighten($color, 38%);
  border-color: lighten($color, 20%);
}
 
// Loop doing all the dumping
@each $type, $color in $message-types {
  .message-#{$type} {
    @include message($color);
  }
}