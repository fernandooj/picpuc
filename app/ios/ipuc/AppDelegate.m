/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import "RNFIRMessaging.h"
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <Firebase.h>
#import <GoogleMaps/GoogleMaps.h>
#import <RNGoogleSignin/RNGoogleSignin.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application openURL:(nonnull NSURL *)url options:(nonnull NSDictionary<NSString *,id> *)options {
  return [RNGoogleSignin application:application
                             openURL:url
                   sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
                          annotation:options[UIApplicationOpenURLOptionsAnnotationKey]];
}


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  [[FBSDKApplicationDelegate sharedInstance] application:application
    didFinishLaunchingWithOptions:launchOptions];

  [GMSServices provideAPIKey:@"AIzaSyBMW85F6kiI1-dXkBDxRIgHWgXTr8vEnmM"];
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"picpuc"
                                            initialProperties:nil];
  
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [[UNUserNotificationCenter currentNotificationCenter] setDelegate:self];
  return YES;
}

// firebase fcm

- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler
{
  [RNFIRMessaging willPresentNotification:notification withCompletionHandler:completionHandler];
}

#if defined(__IPHONE_11_0)
- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler
{
  [RNFIRMessaging didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
}
#else
- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void(^)())completionHandler
{
  [RNFIRMessaging didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
}
#endif
//You can skip this method if you don't want to use local notification
-(void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
  [RNFIRMessaging didReceiveLocalNotification:notification];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo fetchCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler{
  [RNFIRMessaging didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}


- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
