import UIKit

class ViewController: UIViewController {
  override func viewDidLoad() {
    super.viewDidLoad()

    let size = view.bounds.size
    let lynxView = LynxView { builder in
      builder.config = LynxConfig(provider: LynxBundleProvider())
      builder.screenSize = size
      builder.fontScale = 1.0
    }
    lynxView.preferredLayoutWidth = size.width
    lynxView.preferredLayoutHeight = size.height
    lynxView.layoutWidthMode = .exact
    lynxView.layoutHeightMode = .exact
    view.addSubview(lynxView)

    lynxView.loadTemplate(fromURL: "main.lynx", initData: nil)
  }
}
