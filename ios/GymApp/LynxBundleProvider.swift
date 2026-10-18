import Foundation

class LynxBundleProvider: NSObject, LynxTemplateProvider {
  func loadTemplate(withUrl url: String!, onComplete callback: LynxTemplateLoadBlock!) {
    // Only bare names of packaged bundles: no paths, schemes or traversal out of the app bundle.
    guard let name = url, !name.isEmpty, !name.contains("/"), !name.contains(":"), !name.hasPrefix("."),
          let path = Bundle.main.path(forResource: name, ofType: "bundle") else {
      callback(nil, NSError(domain: "com.lynx", code: 400, userInfo: [NSLocalizedDescriptionKey: "Bundle \(url ?? "") not found."]))
      return
    }
    // The bundle is several MB; read it off the main thread and hand it back on main.
    DispatchQueue.global(qos: .userInitiated).async {
      let result = Result { try Data(contentsOf: URL(fileURLWithPath: path), options: .mappedIfSafe) }
      DispatchQueue.main.async {
        switch result {
        case .success(let data): callback(data, nil)
        case .failure(let error): callback(nil, error)
        }
      }
    }
  }
}
