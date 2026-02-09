// Learn more https://docs.expo.io/guides/customizing-metro
const path = require("node:path")
const { getDefaultConfig } = require("expo/metro-config")
const { withNativewind } = require("nativewind/metro")

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

const projectRoot = __dirname
const monorepoRoot = path.resolve(projectRoot, "../..")
const nativeModules = path.resolve(projectRoot, "node_modules")

config.watchFolders = [monorepoRoot]

config.resolver.nodeModulesPaths = [nativeModules, path.resolve(monorepoRoot, "node_modules")]

// Force single React instance across the entire bundle (pnpm monorepo fix)
const singletonPkgs = {
  react: path.resolve(nativeModules, "react"),
  "react-native": path.resolve(nativeModules, "react-native"),
  "react-dom": path.resolve(nativeModules, "react-dom"),
}

const defaultResolveRequest = config.resolver.resolveRequest
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (singletonPkgs[moduleName]) {
    return context.resolveRequest(
      { ...context, resolveRequest: undefined },
      singletonPkgs[moduleName],
      platform
    )
  }
  if (defaultResolveRequest) {
    return defaultResolveRequest(context, moduleName, platform)
  }
  return context.resolveRequest(context, moduleName, platform)
}

config.resolver.unstable_enablePackageExports = true
module.exports = withNativewind(config)
