import Foundation

class LynxBundleProvider: NSObject, LynxTemplateProvider {
  func loadTemplate(withUrl url: String!, onComplete callback: LynxTemplateLoadBlock!) {
    guard let path = Bundle.main.path(forResource: url, ofType: "bundle") else {
      callback(nil, NSError(domain: "com.lynx", code: 400, userInfo: [NSLocalizedDescriptionKey: "Bundle \(url ?? "") not found."]))
      return
    }
    do {
      callback(try Data(contentsOf: URL(fileURLWithPath: path)), nil)
    } catch {
      callback(nil, error)
    }
  }
}
