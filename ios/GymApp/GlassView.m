#import <UIKit/UIKit.h>
#import <Lynx/LynxComponentRegistry.h>
#import <Lynx/LynxPropsProcessor.h>
#import <Lynx/LynxUI.h>

// <glass-view>: a backdrop-blur layer. Liquid Glass on iOS 26+, a dark material blur before that.
// Lynx has no backdrop-filter, so components place this behind their content (see Glass.tsx).
@interface GlassView : LynxUI <UIVisualEffectView *>
@end

@implementation GlassView {
  NSString *_material;
  CGFloat _radius;
}

LYNX_LAZY_REGISTER_UI("glass-view")

- (UIVisualEffectView *)createView {
  UIVisualEffectView *view = [[UIVisualEffectView alloc] initWithEffect:[self effectFor:@"glass"]];
  view.userInteractionEnabled = NO;
  view.clipsToBounds = YES;
  view.layer.cornerCurve = kCACornerCurveContinuous;
  return view;
}

- (UIVisualEffect *)effectFor:(NSString *)material {
  if ([material isEqualToString:@"glass"]) {
    if (@available(iOS 26.0, *)) {
      return [UIGlassEffect effectWithStyle:UIGlassEffectStyleRegular];
    }
  }
  return [UIBlurEffect effectWithStyle:UIBlurEffectStyleSystemUltraThinMaterialDark];
}

LYNX_PROP_SETTER("material", setMaterial, NSString *) {
  NSString *next = requestReset || value == nil ? @"glass" : value;
  if ([next isEqualToString:_material]) return;
  _material = next;
  self.view.effect = [self effectFor:next];
}

LYNX_PROP_SETTER("radius", setRadius, CGFloat) {
  _radius = requestReset ? 0 : value;
  [self applyRadius];
}

// Pill radii (999) are clamped to half the short side, as CSS does.
- (void)applyRadius {
  CGSize size = self.view.bounds.size;
  CGFloat max = MIN(size.width, size.height) / 2;
  self.view.layer.cornerRadius = max > 0 ? MIN(_radius, max) : _radius;
}

- (void)layoutDidFinished {
  [super layoutDidFinished];
  [self applyRadius];
}

// "top" rounds only the top corners (bottom sheets); anything else rounds all four.
LYNX_PROP_SETTER("corners", setCorners, NSString *) {
  BOOL top = !requestReset && [value isEqualToString:@"top"];
  self.view.layer.maskedCorners = top ? (kCALayerMinXMinYCorner | kCALayerMaxXMinYCorner)
                                      : (kCALayerMinXMinYCorner | kCALayerMaxXMinYCorner |
                                         kCALayerMinXMaxYCorner | kCALayerMaxXMaxYCorner);
}

@end
