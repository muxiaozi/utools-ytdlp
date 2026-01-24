"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  BIN_DIR: () => BIN_DIR,
  YtDlp: () => YtDlp,
  helpers: () => helpers
});
module.exports = __toCommonJS(index_exports);
var import_child_process2 = require("child_process");
var fs5 = __toESM(require("fs"));
var import_path2 = __toESM(require("path"));

// src/utils/args.ts
function createArgs(options) {
  const args = [];
  if (options.printHelp) args.push("--help");
  if (options.printVersion) args.push("--version");
  if (options.update) args.push("--update");
  if (options.noUpdate) args.push("--no-update");
  if (options.updateTo) args.push("--update-to", options.updateTo);
  if (options.ignoreErrors) args.push("--ignore-errors");
  if (options.noAbortOnError) args.push("--no-abort-on-error");
  if (options.abortOnError) args.push("--abort-on-error");
  if (options.dumpUserAgent) args.push("--dump-user-agent");
  if (options.listExtractors) args.push("--list-extractors");
  if (options.extractorDescriptions) args.push("--extractor-descriptions");
  if (options.useExtractors && options.useExtractors.length > 0) {
    args.push("--use-extractors", options.useExtractors.join(","));
  }
  if (options.defaultSearch)
    args.push("--default-search", options.defaultSearch);
  if (options.ignoreConfig) args.push("--ignore-config");
  if (options.noConfigLocations) args.push("--no-config-location");
  if (options.configLocations && options.configLocations.length > 0)
    args.push("--config-locations", ...options.configLocations);
  if (options.pluginDirs && options.pluginDirs.length > 0) {
    for (const dir of options.pluginDirs) {
      args.push("--plugin-dirs", dir);
    }
  }
  if (options.noPluginDirs) args.push("--no-plugin-dirs");
  if (options.flatPlaylist) args.push("--flat-playlist");
  if (options.noFlatPlaylist) args.push("--no-flat-playlist");
  if (options.liveFromStart) args.push("--live-from-start");
  if (options.noLiveFromStart) args.push("--no-live-from-start");
  if (options.waitForVideo)
    args.push("--wait-for-video", options.waitForVideo.toString());
  if (options.noWaitForVideo) args.push("--no-wait-for-video");
  if (options.markWatched) args.push("--mark-watched");
  if (options.noMarkWatched) args.push("--no-mark-watched");
  if (options.color) args.push("--color", options.color);
  if (options.compatOptions && options.compatOptions.length > 0) {
    args.push("--compat-options", options.compatOptions.join(","));
  }
  if (options.aliases && options.aliases.length > 0) {
    args.push("--alias", ...options.aliases);
  }
  const jsRuntime = options.jsRuntime ?? "node";
  if (jsRuntime) args.push("--js-runtime", jsRuntime);
  if (options.proxy) args.push("--proxy", options.proxy);
  if (options.socketTimeout)
    args.push("--socket-timeout", options.socketTimeout.toString());
  if (options.sourceAddress)
    args.push("--source-address", options.sourceAddress);
  if (options.impersonate && options.impersonate.length > 0)
    args.push("--impersonate", options.impersonate.join(","));
  if (options.listImpersonateTargets) args.push("--list-impersonate-targets");
  if (options.forceIpv4) args.push("--force-ipv4");
  if (options.forceIpv6) args.push("--force-ipv6");
  if (options.enableFileUrls) args.push("--enable-file-urls");
  if (options.geoVerificationProxy)
    args.push("--geo-verification-proxy", options.geoVerificationProxy);
  if (options.xff) args.push("--xff", options.xff);
  if (options.playlistItems)
    args.push("--playlist-items", options.playlistItems);
  if (options.minFilesize) args.push("--min-filesize", options.minFilesize);
  if (options.maxFilesize) args.push("--max-filesize", options.maxFilesize);
  if (options.date) args.push("--date", options.date);
  if (options.dateBefore) args.push("--datebefore", options.dateBefore);
  if (options.dateAfter) args.push("--dateafter", options.dateAfter);
  if (options.matchFilter) args.push("--match-filter", options.matchFilter);
  if (options.noMatchFilters) args.push("--no-match-filters");
  if (options.breakMatchFilters)
    args.push("--break-match-filters", options.breakMatchFilters);
  if (options.noBreakMatchFilters) args.push("--no-break-match-filters");
  if (options.noPlaylist) args.push("--no-playlist");
  if (options.yesPlaylist) args.push("--yes-playlist");
  if (options.ageLimit) args.push("--age-limit", options.ageLimit.toString());
  if (options.downloadArchive)
    args.push("--download-archive", options.downloadArchive);
  if (options.noDownloadArchive) args.push("--no-download-archive");
  if (options.maxDownloads)
    args.push("--max-downloads", options.maxDownloads.toString());
  if (options.breakOnExisting) args.push("--break-on-existing");
  if (options.noBreakOnExisting) args.push("--no-break-on-existing");
  if (options.breakPerInput) args.push("--break-per-input");
  if (options.noBreakPerInput) args.push("--break-per-input");
  if (options.skipPlaylistAfterErrors)
    args.push(
      "--skip-playlist-after-errors",
      options.skipPlaylistAfterErrors.toString()
    );
  if (options.concurrentFragments)
    args.push("--concurrent-fragments", options.concurrentFragments.toString());
  if (options.limitRate) args.push("--limit-rate", options.limitRate);
  if (options.throttledRate)
    args.push("--throttled-rate", options.throttledRate);
  if (options.retries) args.push("--retries", options.retries.toString());
  if (options.fileAccessRetries)
    args.push("--file-access-retries", options.fileAccessRetries.toString());
  if (options.fragmentRetries)
    args.push("--fragment-retries", options.fragmentRetries.toString());
  if (options.retrySleep)
    args.push("--retry-sleep", options.retrySleep.toString());
  if (options.retrySleepByType) {
    for (const [type, expr] of Object.entries(options.retrySleepByType)) {
      args.push("--retry-sleep", `${type}:${expr}`);
    }
  }
  if (options.skipUnavailableFragments)
    args.push("--skip-unavailable-fragments");
  if (options.abortOnUnavailableFragment)
    args.push("--abort-on-unavailable-fragment");
  if (options.keepFragments) args.push("--keep-fragments");
  if (options.noKeepFragments) args.push("--no-keep-fragments");
  if (options.bufferSize) args.push("--buffer-size", options.bufferSize);
  if (options.resizeBuffer) args.push("--resize-buffer");
  if (options.noResizeBuffer) args.push("--no-resize-buffer");
  if (options.httpChunkSize)
    args.push("--http-chunk-size", options.httpChunkSize);
  if (options.playlistRandom) args.push("--playlist-random");
  if (options.lazyPlaylist) args.push("--lazy-playlist");
  if (options.noLazyPlaylist) args.push("--no-lazy-playlist");
  if (options.xattrSetFilesize) args.push("--xattr-set-filesize");
  if (options.hlsUseMpegts) args.push("--hls-use-mpegts");
  if (options.noHlsUseMpegts) args.push("--no-hls-use-mpegts");
  if (options.downloadSections)
    args.push("--download-sections", options.downloadSections.toString());
  if (options.downloader) args.push("--downloader", options.downloader);
  if (options.downloaderArgs)
    args.push("--downloader-args", options.downloaderArgs);
  if (options.batchFile) args.push("--batch-file", options.batchFile);
  if (options.noBatchFile) args.push("--no-batch-file");
  if (options.paths) {
    if (typeof options.paths === "string") {
      args.push("--paths", options.paths);
    } else {
      for (const [key, value] of Object.entries(options.paths)) {
        args.push("--paths", `${key}:${value}`);
      }
    }
  }
  if (options.output) args.push("-o", options.output);
  if (options.outputNaPlaceholder)
    args.push("--output-na-placeholder", options.outputNaPlaceholder);
  if (options.restrictFilenames) args.push("--restrict-filenames");
  if (options.noRestrictFilenames) args.push("--no-restrict-filenames");
  if (options.windowsFilenames) args.push("--windows-filenames");
  if (options.noWindowsFilenames) args.push("--no-windows-filenames");
  if (options.trimFileNames)
    args.push("--trim-file-names", options.trimFileNames.toString());
  if (options.noOverwrites) args.push("--no-overwrites");
  if (options.forceOverwrites) args.push("--force-overwrites");
  if (options.noForceOverwrites) args.push("--no-force-overwrites");
  if (options.continue) args.push("--continue");
  if (options.noContinue) args.push("--no-continue");
  if (options.part) args.push("--part");
  if (options.noPart) args.push("--no-part");
  if (options.mtime) args.push("--mtime");
  if (options.noMtime) args.push("--no-mtime");
  if (options.writeDescription) args.push("--write-description");
  if (options.noWriteDescription) args.push("--no-write-description");
  if (options.writeInfoJson) args.push("--write-info-json");
  if (options.noWriteInfoJson) args.push("--no-write-info-json");
  if (options.writePlaylistMetafiles) args.push("--write-playlist-metafiles");
  if (options.noWritePlaylistMetafiles)
    args.push("--no-write-playlist-metafiles");
  if (options.cleanInfoJson) args.push("--clean-info-json");
  if (options.noCleanInfoJson) args.push("--no-clean-info-json");
  if (options.writeComments) args.push("--write-comments");
  if (options.noWriteComments) args.push("--no-write-comments");
  if (options.loadInfoJson)
    args.push("--load-info-json", options.loadInfoJson.toString());
  if (options.cookies) args.push("--cookies", options.cookies);
  if (options.noCookies) args.push("--no-cookies");
  if (options.cookiesFromBrowser)
    args.push("--cookies-from-browser", options.cookiesFromBrowser);
  if (options.noCookiesFromBrowser) args.push("--no-cookies-from-browser");
  if (options.cacheDir) args.push("--cache-dir", options.cacheDir);
  if (options.noCacheDir) args.push("--no-cache-dir");
  if (options.rmCacheDir) args.push("--rm-cache-dir");
  if (options.writeThumbnail) args.push("--write-thumbnail");
  if (options.noWriteThumbnails) args.push("--no-write-thumbnails");
  if (options.writeAllThumbnails) args.push("--write-all-thumbnails");
  if (options.listThumbnails) args.push("--list-thumbnails");
  if (options.writeLink) args.push("--write-link");
  if (options.writeUrlLink) args.push("--write-url-link");
  if (options.writeWeblocLink) args.push("--write-webloc-link");
  if (options.writeDesktopLink) args.push("--write-desktop-link");
  if (options.quiet) args.push("--quiet");
  if (options.noQuiet) args.push("--no-quiet");
  if (options.noWarnings) args.push("--no-warnings");
  if (options.simulate) args.push("--simulate");
  if (options.noSimulate) args.push("--no-simulate");
  if (options.ignoreNoFormatsError) args.push("--ignore-no-formats-error");
  if (options.noIgnoreNoFormatsError) args.push("--no-ignore-no-formats-error");
  if (options.skipDownload) args.push("--skip-download");
  if (options.print) args.push("--print", options.print);
  if (options.printToFile) args.push("--print-to-file", options.printToFile);
  if (options.dumpJson) args.push("--dump-json");
  if (options.dumpSingleJson) args.push("--dump-single-json");
  if (options.forceWriteArchive) args.push("--force-write-archive");
  if (options.newline) args.push("--newline");
  if (options.noProgress) args.push("--no-progress");
  if (options.progress) args.push("--progress");
  if (options.consoleTitle) args.push("--console-title");
  if (options.progressTemplate)
    args.push("--progress-template", options.progressTemplate);
  if (options.progressDelta)
    args.push("--progress-delta", options.progressDelta.toString());
  if (options.verbose) args.push("--verbose");
  if (options.dumpPages) args.push("--dump-pages");
  if (options.writePages) args.push("--write-pages");
  if (options.printTraffic) args.push("--print-traffic");
  if (options.encoding) args.push("--encoding", options.encoding);
  if (options.legacyServerConnect) args.push("--legacy-server-connect");
  if (options.noCheckCertificates) args.push("--no-check-certificates");
  if (options.preferInsecure) args.push("--prefer-insecure");
  if (options.addHeaders) {
    for (const [key, value] of Object.entries(options.addHeaders)) {
      args.push("--add-header", `${key}:${value}`);
    }
  }
  if (options.headers) {
    for (const [key, value] of Object.entries(options.headers)) {
      args.push("--add-header", `${key}:${value}`);
    }
  }
  if (options.bidiWorkaround) args.push("--bidi-workaround");
  if (options.sleepRequests)
    args.push("--sleep-requests", options.sleepRequests.toString());
  if (options.sleepInterval)
    args.push("--sleep-interval", options.sleepInterval.toString());
  if (options.maxSleepInterval)
    args.push("--max-sleep-interval", options.maxSleepInterval.toString());
  if (options.sleepSubtitles)
    args.push("--sleep-subtitles", options.sleepSubtitles.toString());
  if (options.format) args.push("-f", options.format);
  if (options.formatSort && options.formatSort.length > 0) {
    args.push("--format-sort", options.formatSort.join(","));
  }
  if (options.formatSortForce) args.push("--format-sort-force");
  if (options.noFormatSortForce) args.push("--no-format-sort-force");
  if (options.videoMultiStreams) args.push("--video-multistreams");
  if (options.noVideoMultiStreams) args.push("--no-video-multistreams");
  if (options.audioMultiStreams) args.push("--audio-multistreams");
  if (options.noAudioMultiStreams) args.push("--no-audio-multistreams");
  if (options.preferFreeFormats) args.push("--prefer-free-formats");
  if (options.noPreferFreeFormats) args.push("--no-prefer-free-formats");
  if (options.checkFormats) args.push("--check-formats");
  if (options.checkAllFormats) args.push("--check-all-formats");
  if (options.noCheckFormats) args.push("--no-check-formats");
  if (options.listFormats) args.push("--list-formats");
  if (options.mergeOutputFormat)
    args.push("--merge-output-format", options.mergeOutputFormat);
  if (options.writeSubs) args.push("--write-subs");
  if (options.noWriteSubs) args.push("--no-write-subs");
  if (options.writeAutoSubs) args.push("--write-auto-subs");
  if (options.writeAllSubs) args.push("--all-subs");
  if (options.listSubs) args.push("--list-subs");
  if (options.subFormat) args.push("--sub-format", options.subFormat);
  if (options.subLangs && options.subLangs.length > 0)
    args.push("--sub-langs", options.subLangs.join(","));
  if (options.username) args.push("--username", options.username);
  if (options.password) args.push("--password", options.password);
  if (options.twoFactor) args.push("--twofactor", options.twoFactor);
  if (options.netrc) args.push("--netrc");
  if (options.videoPassword)
    args.push("--video-password", options.videoPassword);
  if (options.apMso) args.push("--ap-mso", options.apMso);
  if (options.apUsername) args.push("--ap-username", options.apUsername);
  if (options.apPassword) args.push("--ap-password", options.apPassword);
  if (options.netrcLocation)
    args.push("--netrc-location", options.netrcLocation);
  if (options.netrcCmd) args.push("--netrc-cmd", options.netrcCmd);
  if (options.apListMso) args.push("--ap-list-mso");
  if (options.clientCertificate)
    args.push("--client-certificate", options.clientCertificate);
  if (options.clientCertificateKey)
    args.push("--client-certificate-key", options.clientCertificateKey);
  if (options.clientCertificatePassword)
    args.push(
      "--client-certificate-password",
      options.clientCertificatePassword
    );
  if (options.extractorRetries !== void 0)
    args.push("--extractor-retries", options.extractorRetries.toString());
  if (options.allowDynamicMpd) args.push("--allow-dynamic-mpd");
  if (options.ignoreDynamicMpd) args.push("--ignore-dynamic-mpd");
  if (options.hlsSplitDiscontinuity) args.push("--hls-split-discontinuity");
  if (options.noHlsSplitDiscontinuity)
    args.push("--no-hls-split-discontinuity");
  if (options.extractorArgs) {
    for (const [key, value] of Object.entries(options.extractorArgs)) {
      args.push("--extractor-args", `${key}:${value.join(" ")}`);
    }
  }
  if (options.playlistStart !== void 0)
    args.push("--playlist-start", options.playlistStart.toString());
  if (options.playlistEnd !== void 0)
    args.push("--playlist-end", options.playlistEnd.toString());
  if (options.matchTitle) args.push("--match-title", options.matchTitle);
  if (options.rejectTitle) args.push("--reject-title", options.rejectTitle);
  if (options.includeAds) args.push("--include-ads");
  if (options.breakOnReject) args.push("--break-on-reject");
  if (options.noDownload) args.push("--no-download");
  if (options.playlistReverse) args.push("--playlist-reverse");
  if (options.geoBypass) args.push("--geo-bypass");
  if (options.geoBypassCountry)
    args.push("--geo-bypass-country", options.geoBypassCountry);
  if (options.geoBypassIpBlock)
    args.push("--geo-bypass-ip-block", options.geoBypassIpBlock);
  if (options.convertThumbnails)
    args.push("--convert-thumbnails", options.convertThumbnails);
  if (options.writeLink) args.push("--write-link");
  if (options.writeUrlLink) args.push("--write-url-link");
  if (options.writeWeblocLink) args.push("--write-webloc-link");
  if (options.writeLnkLink) args.push("--write-lnk-link");
  if (options.referer) args.push("--referer", options.referer);
  if (options.userAgent) args.push("--user-agent", options.userAgent);
  if (options.extractAudio) args.push("--extract-audio");
  if (options.audioFormat) args.push("--audio-format", options.audioFormat);
  if (options.audioQuality) args.push("--audio-quality", options.audioQuality);
  if (options.remuxVideo) args.push("--remux-video", options.remuxVideo);
  if (options.recodeVideo) args.push("--recode-video", options.recodeVideo);
  if (options.postprocessorArgs) {
    for (const [key, value] of Object.entries(options.postprocessorArgs)) {
      args.push("--postprocessor-args", `${key}:${value.join(" ")}`);
    }
  }
  if (options.keepVideo) args.push("--keep-video");
  if (options.noKeepVideo) args.push("--no-keep-video");
  if (options.postOverwrites) args.push("--post-overwrites");
  if (options.noPostOverwrites) args.push("--no-post-overwrites");
  if (options.embedSubs) args.push("--embed-subs");
  if (options.noEmbedSubs) args.push("--no-embed-subs");
  if (options.embedThumbnail) args.push("--embed-thumbnail");
  if (options.noEmbedThumbnail) args.push("--no-embed-thumbnail");
  if (options.embedMetadata) args.push("--embed-metadata");
  if (options.noEmbedMetadata) args.push("--no-embed-metadata");
  if (options.embedChapters) args.push("--embed-chapters");
  if (options.noEmbedChapters) args.push("--no-embed-chapters");
  if (options.embedInfoJson) args.push("--embed-info-json");
  if (options.noEmbedInfoJson) args.push("--no-embed-info-json");
  if (options.parseMetadata) {
    for (const [key, value] of Object.entries(options.parseMetadata)) {
      args.push("--parse-metadata", `${key}:${value}`);
    }
  }
  if (options.replaceInMetadata) {
    for (const [key, [search, replace]] of Object.entries(
      options.replaceInMetadata
    )) {
      args.push("--replace-in-metadata", `${key} ${search} ${replace}`);
    }
  }
  if (options.xattrs) args.push("--xattrs");
  if (options.concatPlaylist)
    args.push("--concat-playlist", options.concatPlaylist);
  if (options.fixup) args.push("--fixup", options.fixup);
  if (options.ffmpegLocation)
    args.push("--ffmpeg-location", options.ffmpegLocation);
  if (options.exec) args.push("--exec", options.exec);
  if (options.noExec) args.push("--no-exec");
  if (options.convertSubs) args.push("--convert-subs", options.convertSubs);
  if (options.convertThumbnails)
    args.push("--convert-thumbnails", options.convertThumbnails);
  if (options.splitChapters) args.push("--split-chapters");
  if (options.noSplitChapters) args.push("--no-split-chapters");
  if (options.removeChapters)
    args.push("--remove-chapters", options.removeChapters);
  if (options.noRemoveChapters) args.push("--no-remove-chapters");
  if (options.forceKeyframesAtCuts) args.push("--force-keyframes-at-cuts");
  if (options.noForceKeyframesAtCuts) args.push("--no-force-keyframes-at-cuts");
  if (options.usePostProcessor && options.usePostProcessor.length > 0) {
    for (const pp of options.usePostProcessor) {
      args.push("--use-postprocessor", pp);
    }
  }
  if (options.sponsorblockMark && options.sponsorblockMark.length > 0) {
    args.push("--sponsorblock-mark", options.sponsorblockMark.join(","));
  }
  if (options.sponsorblockRemove && options.sponsorblockRemove.length > 0) {
    args.push("--sponsorblock-remove", options.sponsorblockRemove.join(","));
  }
  if (options.sponsorblockChapterTitle)
    args.push("--sponsorblock-chapter-title", options.sponsorblockChapterTitle);
  if (options.noSponsorblock) args.push("--no-sponsorblock");
  if (options.sponsorblockApi)
    args.push("--sponsorblock-api", options.sponsorblockApi);
  if (options.additionalOptions && options.additionalOptions.length > 0) {
    args.push(...options.additionalOptions);
  }
  if (options.rawArgs && options.rawArgs.length > 0) {
    args.push(...options.rawArgs);
  }
  return args;
}

// src/utils/thumbnails.ts
function extractThumbnails(consoleOutput) {
  const thumbnails = [];
  const lines = consoleOutput.split("\n").slice(1);
  for (const line of lines) {
    const match = line.match(/(\d+)\s+(\S+)\s+(\S+)\s+(https:\/\/[\S]+)/);
    if (match) {
      thumbnails.push({
        id: parseInt(match[1], 10),
        width: match[2] === "unknown" ? "unknown" : parseInt(match[2], 10),
        height: match[3] === "unknown" ? "unknown" : parseInt(match[3], 10),
        url: match[4]
      });
    }
  }
  return thumbnails;
}

// src/utils/format.ts
var ByQuality = {
  "2160p": "bv*[height<=2160]",
  "1440p": "bv*[height<=1440]",
  "1080p": "bv*[height<=1080]",
  "720p": "bv*[height<=720]",
  "480p": "bv*[height<=480]",
  "360p": "bv*[height<=360]",
  "240p": "bv*[height<=240]",
  "144p": "bv*[height<=133]",
  highest: "bv*",
  lowest: "wv*"
};
function parseFormatOptions(format) {
  if (!format) {
    return [];
  }
  if (typeof format === "string") {
    return ["-f", format];
  }
  if (Object.keys(format).length === 0) {
    return ["-f", "bv*+ba"];
  }
  let formatArr = [];
  const { filter, quality, type } = format;
  if (filter === "audioonly") {
    formatArr = [
      "-x",
      "--audio-format",
      type ? type : "mp3",
      "--audio-quality",
      quality ? quality.toString() : "5"
    ];
  }
  if (filter === "videoonly") {
    formatArr = [
      "-f",
      (quality ? ByQuality[quality] : "bv*") + "[acodec=none]"
    ];
  }
  if (filter === "audioandvideo") {
    formatArr = [
      "-f",
      (quality == "lowest" ? "w*" : "b*") + "[vcodec!=none][acodec!=none][ext=" + (type ? type : "mp4") + "]"
    ];
  }
  if (filter === "mergevideo") {
    const videoQuality = quality ? ByQuality[quality] : "bv*";
    formatArr = ["-f", `${videoQuality}+ba`];
    if (type) {
      formatArr.push("--merge-output-format", type);
    }
  }
  return formatArr;
}
function getContentType(format) {
  if (!format || typeof format === "string") {
    return "video/mp4";
  }
  const { filter, type } = format;
  switch (filter) {
    case "videoonly":
    case "audioandvideo":
      switch (type) {
        case "mp4":
          return "video/mp4";
        case "webm":
          return "video/webm";
        default:
          return "video/mp4";
      }
    case "audioonly":
      switch (type) {
        case "aac":
          return "audio/aac";
        case "flac":
          return "audio/flac";
        case "mp3":
          return "audio/mp3";
        case "m4a":
          return "audio/mp4";
        case "opus":
          return "audio/opus";
        case "vorbis":
          return "audio/vorbis";
        case "wav":
          return "audio/wav";
        case "alac":
          return "audio/mp4";
        default:
          return "audio/mpeg";
      }
    case "mergevideo":
      switch (type) {
        case "webm":
          return "video/webm";
        case "mkv":
          return "video/x-matroska";
        case "ogg":
          return "video/ogg";
        case "flv":
          return "video/x-flv";
        default:
          return "video/mp4";
      }
  }
}
function getFileExtension(format) {
  if (!format || typeof format === "string") {
    return "mp4";
  }
  const { filter, type } = format;
  if (type) {
    return type;
  }
  return filter === "audioonly" ? "mp3" : "mp4";
}
function getContentTypeFromArgs(options) {
  if (!options?.extractAudio) {
    return null;
  }
  const audioFormat = options.audioFormat || "mp3";
  switch (audioFormat) {
    case "aac":
      return "audio/aac";
    case "flac":
      return "audio/flac";
    case "mp3":
      return "audio/mpeg";
    case "m4a":
      return "audio/mp4";
    case "opus":
      return "audio/opus";
    case "vorbis":
      return "audio/vorbis";
    case "wav":
      return "audio/wav";
    case "alac":
      return "audio/mp4";
    default:
      return "audio/mpeg";
  }
}

// src/utils/progress.ts
var PROGRESS_STRING = "~ytdlp-progress-%(progress)#j";
function formatBytes(bytes, decimals = 2) {
  const newBytes = Number(bytes);
  if (newBytes === 0 || isNaN(newBytes)) return newBytes + " Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(newBytes) / Math.log(k));
  return parseFloat((newBytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
function toFixedNumber(num, digits, base) {
  const pow = Math.pow(base || 10, digits);
  return Math.round(num * pow) / pow;
}
function secondsToHms(d) {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor(d % 3600 / 60);
  const s = Math.floor(d % 3600 % 60);
  const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  const mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  const sDisplay = s >= 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return hDisplay + mDisplay + sDisplay;
}
function stringToProgress(str) {
  try {
    if (!str.includes("~ytdlp-progress-")) throw new Error();
    const jsonStr = str.trim().replace("~ytdlp-progress-", "");
    if (!jsonStr) throw new Error();
    const object = JSON.parse(jsonStr);
    const parseNum = (val) => {
      if (val === null || val === void 0 || val === "NA") return void 0;
      const num = Number(val);
      return isNaN(num) ? void 0 : num;
    };
    const downloaded = parseNum(object.downloaded_bytes);
    const total = parseNum(object.total_bytes) ?? parseNum(object.total_bytes_estimate);
    const speed = parseNum(object.speed);
    const eta = parseNum(object.eta);
    const pct = downloaded !== void 0 && total !== void 0 && total > 0 ? toFixedNumber(100 * downloaded / total, 2) : void 0;
    return {
      filename: object.filename,
      status: object.status,
      downloaded,
      downloaded_str: downloaded !== void 0 ? formatBytes(downloaded) : void 0,
      total,
      total_str: total !== void 0 ? formatBytes(total) : void 0,
      speed,
      speed_str: speed !== void 0 ? formatBytes(speed) + "/s" : void 0,
      eta,
      eta_str: eta !== void 0 ? secondsToHms(eta) : void 0,
      percentage: pct,
      percentage_str: pct !== void 0 ? pct + "%" : void 0
    };
  } catch {
    return void 0;
  }
}

// src/utils/ffmpeg.ts
var import_path = __toESM(require("path"));
var import_fs = __toESM(require("fs"));

// src/utils/request.ts
var https = __toESM(require("https"));
var http = __toESM(require("http"));
var import_url = require("url");
var fs = __toESM(require("fs"));
function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new import_url.URL(url);
    const protocol = parsedUrl.protocol === "https:" ? https : http;
    const req = protocol.get(url, options, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        const redirectUrl = new import_url.URL(response.headers.location, url).toString();
        request(redirectUrl, options).then(resolve).catch(reject);
        return;
      }
      resolve(response);
    });
    req.on("error", reject);
    req.setTimeout(3e4, () => {
      req.destroy();
      reject(new Error("Request timed out"));
    });
  });
}
async function downloadFile(url, outputPath) {
  try {
    const fileStream = fs.createWriteStream(outputPath);
    const response = await request(url);
    if (response.statusCode !== 200) {
      fileStream.close();
      fs.unlinkSync(outputPath);
      throw new Error(
        `Failed to download file: ${response.statusCode} ${response.statusMessage}`
      );
    }
    const totalSize = parseInt(response.headers["content-length"] || "0", 10);
    let downloadedSize = 0;
    response.on("data", (chunk) => {
      downloadedSize += chunk.length;
      const progress = downloadedSize / totalSize * 100;
      process.stdout.write(`Progress: ${Math.round(progress)}%\r`);
    });
    response.pipe(fileStream);
    return new Promise((resolve, reject) => {
      fileStream.on("finish", () => {
        fileStream.close();
        console.log("\nDownload complete!");
        resolve();
      });
      fileStream.on("error", (err) => {
        fileStream.close();
        fs.unlinkSync(outputPath);
        reject(err);
      });
      response.on("error", (err) => {
        fileStream.close();
        fs.unlinkSync(outputPath);
        reject(err);
      });
    });
  } catch (error) {
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }
    throw error;
  }
}
async function fetchText(url, options = {}) {
  const response = await request(url, options);
  if (response.statusCode !== 200) {
    throw new Error(
      `Failed to fetch text: ${response.statusCode} ${response.statusMessage}`
    );
  }
  return new Promise((resolve, reject) => {
    let data = "";
    response.setEncoding("utf8");
    response.on("data", (chunk) => {
      data += chunk;
    });
    response.on("end", () => resolve(data));
    response.on("error", reject);
  });
}

// src/configs/paths.ts
var fs2 = __toESM(require("fs"));
var path = __toESM(require("path"));
function findPackageRoot(startDir) {
  let current = startDir;
  while (true) {
    if (fs2.existsSync(path.join(current, "package.json"))) {
      return current;
    }
    const parent = path.dirname(current);
    if (parent === current) {
      return startDir;
    }
    current = parent;
  }
}
var PACKAGE_ROOT = findPackageRoot(__dirname);
var BIN_DIR = path.join(PACKAGE_ROOT, "bin");
var PACKAGE_JSON_PATH = path.join(PACKAGE_ROOT, "package.json");

// src/utils/ffmpeg.ts
var DOWNLOAD_BASE_URL = "https://github.com/iqbal-rashed/ytdlp-nodejs/releases/download/ffmpeg-latest";
var PLATFORM_MAPPINGS = {
  win32: {
    x64: ["win-x64-ffmpeg.exe", "win-x64-ffprobe.exe"],
    ia32: ["win-ia32-ffmpeg.exe", "win-ia32-ffprobe.exe"],
    arm64: ["win-arm64-ffmpeg.exe", "win-arm64-ffprobe.exe"]
  },
  linux: {
    x64: ["linux-x64-ffmpeg", "linux-x64-ffprobe"],
    arm64: ["linux-arm64-ffmpeg", "linux-arm64-ffprobe"]
  },
  darwin: {
    x64: ["macos-x64-ffmpeg", "macos-x64-ffprobe"],
    arm64: ["macos-arm64-ffmpeg", "macos-arm64-ffprobe"]
  },
  android: {
    arm64: ["linux-arm64-ffmpeg", "linux-arm64-ffprobe"]
  }
};
function getBuildsArray() {
  const platform = process.platform;
  const arch = process.arch;
  if (!PLATFORM_MAPPINGS[platform] || !PLATFORM_MAPPINGS[platform][arch]) {
    throw new Error(
      `No FFmpeg build available for platform: ${platform}, architecture: ${arch}`
    );
  }
  return PLATFORM_MAPPINGS[platform][arch];
}
async function downloadFFmpeg(out) {
  const OUT_DIR = out || BIN_DIR;
  const ffmpegBinary = findFFmpegBinary();
  if (ffmpegBinary) {
    return ffmpegBinary;
  }
  try {
    const buildsArr = getBuildsArray();
    if (!buildsArr.length) throw new Error();
    const downloadUrls = buildsArr.map((v) => `${DOWNLOAD_BASE_URL}/${v}`);
    const outputPaths = buildsArr.map(
      (v) => import_path.default.join(OUT_DIR, String(v.split("-").pop()))
    );
    if (!import_fs.default.existsSync(OUT_DIR)) {
      import_fs.default.mkdirSync(OUT_DIR, { recursive: true });
    }
    console.log("Downloading FFmpeg and FFprobe...");
    for (let i = 0; i < buildsArr.length; i++) {
      const downloadUrl = downloadUrls[i];
      const outputPath = outputPaths[i];
      console.log("Downloading...", import_path.default.basename(downloadUrl));
      await downloadFile(downloadUrl, outputPath);
    }
    try {
      for (const outputPath of outputPaths) {
        import_fs.default.chmodSync(outputPath, 493);
      }
    } catch {
      console.log(
        "Note: Could not set executable permissions (likely Windows)"
      );
    }
    return findFFmpegBinary();
  } catch (error) {
    console.error(`Download failed: ${error}`);
    throw error;
  }
}
function findFFmpegBinary() {
  try {
    const buildsArr = getBuildsArray();
    if (!buildsArr.length) throw new Error();
    const ffmpegPath = import_path.default.join(
      BIN_DIR,
      String(buildsArr[0].split("-").pop())
    );
    if (!import_fs.default.existsSync(ffmpegPath)) {
      throw new Error("FFmpeg binary not found. Please download it first.");
    }
    return ffmpegPath;
  } catch {
    return void 0;
  }
}

// src/utils/ytdlp.ts
var fs4 = __toESM(require("fs"));
var path3 = __toESM(require("path"));
var import_crypto = __toESM(require("crypto"));
var DOWNLOAD_BASE_URL2 = "https://github.com/yt-dlp/yt-dlp/releases/latest/download";
var PLATFORM_MAPPINGS2 = {
  win32: {
    x64: "yt-dlp.exe",
    ia32: "yt-dlp_x86.exe"
  },
  linux: {
    x64: "yt-dlp",
    armv7l: "yt-dlp_linux_armv7l",
    aarch64: "yt-dlp_linux_aarch64",
    arm64: "yt-dlp"
  },
  darwin: {
    x64: "yt-dlp_macos",
    arm64: "yt-dlp_macos"
  },
  android: {
    arm64: "yt-dlp"
  }
};
function getYtdlpFilename() {
  const platform = process.platform;
  const arch = process.arch;
  if (!PLATFORM_MAPPINGS2[platform] || !PLATFORM_MAPPINGS2[platform][arch]) {
    throw new Error(`No yt-dlp build available for ${platform} ${arch}`);
  }
  const filename = PLATFORM_MAPPINGS2[platform][arch];
  return filename;
}
async function downloadYtDlp(out) {
  const OUT_DIR = out || BIN_DIR;
  const fileName = getYtdlpFilename();
  const downloadUrl = `${DOWNLOAD_BASE_URL2}/${fileName}`;
  const outputPath = path3.join(OUT_DIR, fileName);
  const isExists = fs4.existsSync(outputPath);
  if (isExists) return outputPath;
  console.log(`Downloading yt-dlp...`, downloadUrl);
  if (!fs4.existsSync(OUT_DIR)) {
    fs4.mkdirSync(OUT_DIR, { recursive: true });
  }
  try {
    await downloadFile(downloadUrl, outputPath);
    console.log(`yt-dlp downloaded successfully to: ${outputPath}`);
    try {
      fs4.chmodSync(outputPath, 493);
    } catch {
      console.log("Error while chmod");
    }
    return outputPath;
  } catch (error) {
    console.error(`Download failed: ${error}`);
    throw error;
  }
}
async function sha256File(filePath) {
  return new Promise((resolve, reject) => {
    const hash = import_crypto.default.createHash("sha256");
    const stream = fs4.createReadStream(filePath);
    stream.on("data", (data) => hash.update(data));
    stream.on("end", () => resolve(hash.digest("hex")));
    stream.on("error", reject);
  });
}
async function getChecksum(fileName) {
  try {
    const checksums = await fetchText(`${DOWNLOAD_BASE_URL2}/SHA2-256SUMS`);
    const lines = checksums.split(/\r?\n/);
    const match = lines.find((line) => line.includes(fileName));
    if (!match) return void 0;
    const [hash] = match.trim().split(/\s+/);
    return hash || void 0;
  } catch {
    return void 0;
  }
}
async function downloadYtDlpVerified(out) {
  const outputPath = await downloadYtDlp(out);
  const fileName = path3.basename(outputPath);
  const checksum = await getChecksum(fileName);
  if (!checksum) {
    return { path: outputPath, verified: false };
  }
  const hash = await sha256File(outputPath);
  if (hash.toLowerCase() !== checksum.toLowerCase()) {
    throw new Error(
      `Checksum mismatch for ${fileName}. Expected ${checksum}, got ${hash}`
    );
  }
  return { path: outputPath, verified: true, checksum };
}
function findYtdlpBinary() {
  const platform = process.platform;
  const arch = process.arch;
  try {
    const binaryName = PLATFORM_MAPPINGS2[platform][arch];
    const ytdlpPath = path3.join(BIN_DIR, binaryName);
    if (!fs4.existsSync(ytdlpPath)) {
      throw new Error("Ytdlp binary not found. Please download it first.");
    }
    return ytdlpPath;
  } catch {
    return void 0;
  }
}

// src/core/args.ts
function buildYtDlpArgs({
  url,
  options,
  ffmpegPath,
  withProgressTemplate,
  extra
}) {
  const args = createArgs(options || {});
  if (ffmpegPath) {
    args.push("--ffmpeg-location", ffmpegPath);
  }
  if (withProgressTemplate) {
    args.push("--progress-template", PROGRESS_STRING);
  }
  if (extra && extra.length > 0) {
    args.push(...extra);
  }
  if (url) {
    args.push(url);
  }
  return args;
}

// src/core/runner.ts
var import_child_process = require("child_process");

// src/core/errors.ts
var YtDlpError = class extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = "YtDlpError";
    this.exitCode = details.exitCode;
    this.stdout = details.stdout;
    this.stderr = details.stderr;
    this.args = details.args;
    this.hint = details.hint;
  }
};

// src/core/hints.ts
var JS_RUNTIME_HINT = "yt-dlp reported a missing JavaScript runtime. Install Node.js or a supported browser runtime for full YouTube support. See README troubleshooting for details.";
function detectYtDlpHint(stderr) {
  const normalized = stderr.toLowerCase();
  if (normalized.includes("javascript runtime") || normalized.includes("js runtime") || normalized.includes("node.js") || normalized.includes("nodejs") || normalized.includes("phantomjs") || normalized.includes("chromium") || normalized.includes("firefox")) {
    return JS_RUNTIME_HINT;
  }
  return void 0;
}

// src/core/parsers/paths.ts
function parsePrintedOutput(output) {
  return output.replace(/~ytdlp-progress-\{[\s\S]*?\}\n?/g, "").split(/\r?\n/).map((line) => line.trim()).filter((line) => line.length > 0).filter((line) => !line.includes("__YTDLP_FILEPATH__:")).filter((line) => !line.includes("__YTDLP_VIDEO_INFO__:")).join("\n");
}
function parsePrintedVideoInfo(output) {
  const lines = output.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("__YTDLP_VIDEO_INFO__:")) {
      const jsonStr = trimmed.replace("__YTDLP_VIDEO_INFO__:", "").trim();
      try {
        const cleanedJsonStr = jsonStr.replace(/:"N\/A"/g, ":null").replace(/:"NA"/g, ":null").replace(/:""/g, ':"NA"');
        const parsed = JSON.parse(cleanedJsonStr);
        const result = {};
        for (const [key, value] of Object.entries(parsed)) {
          if (value === "NA") {
            result[key] = null;
          } else if (typeof value === "string" && value === "N/A") {
            result[key] = null;
          } else if ((key.includes("_count") || key.includes("_timestamp") || key === "autonumber" || key === "video_autonumber" || key === "n_entries" || key === "playlist_count" || key === "release_year" || key === "start_time" || key === "end_time" || key === "epoch" || key === "duration" || key === "age_limit") && typeof value === "string") {
            const num = Number(value);
            result[key] = isNaN(num) ? null : num;
          } else if ((key === "is_live" || key === "was_live" || key === "channel_is_verified") && typeof value === "string") {
            result[key] = value === "true" || value === "True";
          } else if ((key === "categories" || key === "tags" || key === "creators" || key === "cast") && typeof value === "string") {
            if (value === "NA" || value === "N/A" || value === "") {
              result[key] = null;
            } else {
              result[key] = value.split(",").map((s) => s.trim());
            }
          } else {
            result[key] = value;
          }
        }
        return result;
      } catch {
        return null;
      }
    }
  }
  return null;
}

// src/core/runner.ts
function emitProgress(data, onProgress, emit) {
  const progress = stringToProgress(data);
  if (progress) {
    onProgress?.(progress);
    emit?.(progress);
  }
}
function spawnYtDlp(binaryPath, args, options = {}) {
  if (options.debugPrintCommandLine) {
    console.error(`[ytdlp-nodejs] Command: ${binaryPath} ${args.join(" ")}`);
  }
  const child = (0, import_child_process.spawn)(binaryPath, args, { shell: false });
  let stdout = "";
  let stderr = "";
  child.stdout.on("data", (data) => {
    const text = Buffer.from(data).toString();
    stdout += text;
    emitProgress(
      text,
      void 0,
      (progress) => child.emit("progress", progress)
    );
  });
  child.stderr.on("data", (data) => {
    const text = Buffer.from(data).toString();
    stderr += text;
    emitProgress(
      text,
      void 0,
      (progress) => child.emit("progress", progress)
    );
  });
  child.on("close", () => {
    const newOutput = parsePrintedOutput(stdout);
    const info = parsePrintedVideoInfo(stdout);
    child.emit("finish", {
      output: newOutput,
      filePath: info?.filepath ?? "",
      info,
      stderr
    });
  });
  return child;
}
function runYtDlp(binaryPath, args, options = {}) {
  return new Promise((resolve, reject) => {
    if (options.debugPrintCommandLine) {
      console.error(`[ytdlp-nodejs] Command: ${binaryPath} ${args.join(" ")}`);
    }
    const child = (0, import_child_process.spawn)(binaryPath, args, { shell: false });
    let stdout = "";
    let stderr = "";
    if (options.passThrough) {
      child.stdout.pipe(options.passThrough);
    }
    child.stdout.on("data", (data) => {
      if (options.passThrough) return;
      const text = Buffer.from(data).toString();
      stdout += text;
      options.onStdout?.(text);
      emitProgress(text, options.onProgress);
    });
    child.stderr.on("data", (data) => {
      const text = Buffer.from(data).toString();
      stderr += text;
      options.onStderr?.(text);
      emitProgress(text, options.onProgress);
    });
    child.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr, exitCode: code });
      } else {
        const hint = detectYtDlpHint(stderr);
        reject(
          new YtDlpError(`yt-dlp exited with code ${code}: ${stderr}`, {
            exitCode: code ?? void 0,
            stdout,
            stderr,
            args,
            hint
          })
        );
      }
    });
    child.on("error", (err) => {
      reject(
        new YtDlpError(`Failed to start yt-dlp process: ${err.message}`, {
          args
        })
      );
    });
  });
}

// src/operations/download.ts
function buildDownloadArgs(opts) {
  return buildYtDlpArgs({
    url: opts.url,
    options: opts.options,
    ffmpegPath: opts.ffmpegPath,
    withProgressTemplate: opts.withProgressTemplate,
    extra: opts.extra
  });
}
var VIDEO_INFO_FIELDS = [
  "id",
  "title",
  "fulltitle",
  "ext",
  "alt_title",
  "description",
  "display_id",
  "uploader",
  "uploader_id",
  "uploader_url",
  "license",
  "creators",
  "creator",
  "timestamp",
  "upload_date",
  "release_timestamp",
  "release_date",
  "release_year",
  "modified_timestamp",
  "modified_date",
  "channel",
  "channel_id",
  "channel_url",
  "channel_follower_count",
  "channel_is_verified",
  "location",
  "duration",
  "duration_string",
  "view_count",
  "concurrent_view_count",
  "like_count",
  "dislike_count",
  "repost_count",
  "average_rating",
  "comment_count",
  "save_count",
  "age_limit",
  "live_status",
  "is_live",
  "was_live",
  "playable_in_embed",
  "availability",
  "media_type",
  "start_time",
  "end_time",
  "extractor",
  "extractor_key",
  "epoch",
  "autonumber",
  "video_autonumber",
  "n_entries",
  "playlist_id",
  "playlist_title",
  "playlist",
  "playlist_count",
  "playlist_index",
  "playlist_autonumber",
  "playlist_uploader",
  "playlist_uploader_id",
  "playlist_channel",
  "playlist_channel_id",
  "playlist_webpage_url",
  "webpage_url",
  "webpage_url_basename",
  "webpage_url_domain",
  "original_url",
  "categories",
  "tags",
  "cast",
  "filepath"
];
function buildDownloadExtraArgs(format) {
  const extra = parseFormatOptions(format);
  const jsonFields = VIDEO_INFO_FIELDS.map(
    (field) => `"${field}":%(${field}|null)j`
  ).join(",");
  extra.push("--print", `after_move:__YTDLP_VIDEO_INFO__:{${jsonFields}}`);
  extra.push("--progress", "--newline");
  return extra;
}
function executeDownload(ctx, args) {
  if (!ctx.binaryPath) throw new Error("Ytdlp binary not found");
  return spawnYtDlp(ctx.binaryPath, args);
}
async function executeDownloadAsync(ctx, args, onData, passThrough) {
  if (!ctx.binaryPath) throw new Error("Ytdlp binary not found");
  const result = await runYtDlp(ctx.binaryPath, args, {
    onStdout: onData,
    onStderr: onData,
    passThrough
  });
  return result.stdout;
}
async function downloadInternal(ctx, url, options) {
  const { format, onProgress, ...opt } = options || {};
  const extra = buildDownloadExtraArgs(format);
  const args = buildDownloadArgs({
    url,
    options: opt,
    ffmpegPath: ctx.ffmpegPath,
    withProgressTemplate: !!onProgress,
    extra
  });
  const output = await executeDownloadAsync(ctx, args, (data) => {
    const progress = stringToProgress(data);
    if (progress) {
      onProgress?.(progress);
    }
  });
  const newOutput = parsePrintedOutput(output);
  const info = parsePrintedVideoInfo(output);
  return { output: newOutput, info };
}
function downloadSync(ctx, url, options) {
  const { format, ...opt } = options || {};
  const extra = buildDownloadExtraArgs(format);
  const args = buildDownloadArgs({
    url,
    options: opt,
    ffmpegPath: ctx.ffmpegPath,
    withProgressTemplate: true,
    extra
  });
  const ytDlpProcess = executeDownload(ctx, args);
  return ytDlpProcess;
}
async function downloadAsync(ctx, url, options) {
  const result = await downloadInternal(ctx, url, options);
  return {
    output: result.output,
    filePath: result.info?.filepath ?? "",
    info: result.info ?? void 0
  };
}

// src/operations/stream.ts
var import_stream = require("stream");
async function executeWithStream(ctx, args, onProgress, passThrough) {
  if (!ctx.binaryPath) throw new Error("Ytdlp binary not found");
  const result = await runYtDlp(ctx.binaryPath, args, {
    passThrough,
    onProgress
  });
  return result.stdout;
}
function createStream(ctx, url, options) {
  const { format, onProgress, ...opt } = options || {};
  const args = buildYtDlpArgs({
    url,
    options: opt,
    ffmpegPath: ctx.ffmpegPath,
    withProgressTemplate: !!onProgress,
    extra: [...parseFormatOptions(format), "-o", "-"]
  });
  const passThrough = new import_stream.PassThrough();
  const promise = executeWithStream(ctx, args, onProgress, passThrough);
  return {
    promise,
    pipe: (destination, pipeOptions) => passThrough.pipe(destination, pipeOptions),
    pipeAsync: (destination, pipeOptions) => {
      return new Promise((resolve, reject) => {
        const pt = passThrough.pipe(destination, pipeOptions);
        destination.on("finish", () => resolve(pt));
        destination.on("error", reject);
      });
    }
  };
}
async function getFileAsync(ctx, url, options) {
  const { format, filename, metadata, onProgress, ...opt } = options || {};
  let capturedTitle = "";
  if (!filename) {
    try {
      const titleResult = await runYtDlp(ctx.binaryPath, [
        "--print",
        "%(title)s",
        "--no-download",
        url
      ]);
      capturedTitle = titleResult.stdout.trim();
    } catch {
    }
  }
  const passThrough = new import_stream.PassThrough();
  const chunks = [];
  passThrough.on("data", (chunk) => {
    chunks.push(Buffer.from(chunk));
  });
  const args = buildYtDlpArgs({
    url,
    options: opt,
    ffmpegPath: ctx.ffmpegPath,
    withProgressTemplate: !!onProgress,
    extra: [...parseFormatOptions(format), "-o", "-"]
  });
  if (!ctx.binaryPath) throw new Error("Ytdlp binary not found");
  await runYtDlp(ctx.binaryPath, args, {
    onStderr: (data) => {
      if (onProgress) {
        const progress = stringToProgress(data);
        if (progress) {
          onProgress(progress);
        }
      }
    },
    passThrough
  });
  const contentType = getContentTypeFromArgs(opt) || getContentType(format) || "video/mp4";
  const extMap = {
    "video/mp4": "mp4",
    "video/webm": "webm",
    "video/mkv": "mkv",
    "audio/mp3": "mp3",
    "audio/mpeg": "mp3",
    "audio/m4a": "m4a",
    "audio/aac": "aac",
    "audio/flac": "flac",
    "audio/wav": "wav",
    "audio/ogg": "ogg",
    "audio/opus": "opus"
  };
  const ext = extMap[contentType] || contentType.split("/")[1] || "mp4";
  const capturedFilename = capturedTitle ? `${capturedTitle}.${ext}` : "";
  const finalFilename = filename || capturedFilename || "download";
  const finalMetadata = {
    name: finalFilename,
    type: contentType,
    size: Buffer.concat(chunks).length,
    ...metadata
  };
  return new File([new Uint8Array(Buffer.concat(chunks))], finalMetadata.name, {
    type: finalMetadata.type
  });
}

// src/core/parsers/json.ts
function parseJson(raw) {
  const trimmed = raw.trim();
  if (!trimmed) {
    throw new Error("Empty JSON output from yt-dlp.");
  }
  return JSON.parse(trimmed);
}

// src/operations/info.ts
async function execute(ctx, args) {
  if (!ctx.binaryPath) throw new Error("Ytdlp binary not found");
  const result = await runYtDlp(ctx.binaryPath, args);
  return result.stdout;
}
async function getInfoAsync(ctx, url, options) {
  const args = [
    "--dump-single-json",
    "--quiet",
    ...createArgs({ flatPlaylist: true, ...options }),
    url
  ];
  const execResult = await execute(ctx, args);
  return parseJson(execResult);
}
async function getFormatsAsync(ctx, url, options) {
  const args = [
    "--dump-single-json",
    "--quiet",
    ...createArgs({ flatPlaylist: true, ...options }),
    url
  ];
  const execResult = await execute(ctx, args);
  const info = parseJson(execResult);
  const formats = info.formats || [];
  return {
    source: "json",
    info,
    formats
  };
}
async function getDirectUrlsAsync(ctx, url, options) {
  const args = ["--get-url", ...createArgs(options || {}), url];
  const execResult = await execute(ctx, args);
  return String(execResult).split(/\r?\n/).map((line) => line.trim()).filter((line) => line.length > 0);
}
async function getThumbnailsAsync(ctx, url) {
  const args = [
    "--print",
    "thumbnails_table",
    "--print",
    "playlist:thumbnails_table",
    "--quiet",
    url
  ];
  const execResult = await execute(ctx, args);
  return extractThumbnails(execResult);
}
async function getTitleAsync(ctx, url) {
  const args = ["--print", "title", url];
  const execResult = await execute(ctx, args);
  return execResult;
}
async function getVersionAsync(ctx) {
  const execResult = await execute(ctx, ["--version"]);
  return execResult.trim();
}
async function getUrlsAsync(ctx, url, options) {
  const args = [
    "--print",
    "urls",
    ...createArgs({ flatPlaylist: true, ...options }),
    url
  ];
  const execResult = await execute(ctx, args);
  return String(execResult).split("\n");
}

// src/index.ts
var YtDlp = class {
  /**
   * Creates a new YtDlp instance.
   * @param opt - Configuration options for binary paths
   */
  constructor(opt) {
    this.binaryPath = opt?.binaryPath || findYtdlpBinary() || "";
    this.ffmpegPath = opt?.ffmpegPath || findFFmpegBinary();
    if (!this.binaryPath || !fs5.existsSync(this.binaryPath)) {
      console.error(
        new Error(
          "yt-dlp binary not found. Please install yt-dlp or specify correct binaryPath in options."
        )
      );
    }
    if (this.ffmpegPath && !fs5.existsSync(this.ffmpegPath)) {
      console.error(
        new Error(
          `FFmpeg binary not found at: ${this.ffmpegPath}. Please install FFmpeg or specify correct ffmpegPath.`
        )
      );
    }
    if (process.platform !== "win32" && this.binaryPath && this.binaryPath.startsWith(BIN_DIR)) {
      try {
        fs5.chmodSync(this.binaryPath, 493);
      } catch {
      }
    }
  }
  /** Gets the context for download operations. */
  getDownloadContext() {
    return { binaryPath: this.binaryPath, ffmpegPath: this.ffmpegPath };
  }
  /** Gets the context for stream operations. */
  getStreamContext() {
    return { binaryPath: this.binaryPath, ffmpegPath: this.ffmpegPath };
  }
  /** Gets the context for info operations. */
  getInfoContext() {
    return { binaryPath: this.binaryPath };
  }
  /**
   * Asynchronously checks if yt-dlp and optionally FFmpeg are installed.
   * @param options - Check options
   * @returns Promise resolving to true if binaries are available
   */
  async checkInstallationAsync(options) {
    return new Promise((resolve, reject) => {
      if (options?.ffmpeg && !this.ffmpegPath) {
        return reject(new Error("FFmpeg path is not set"));
      }
      const binaryProcess = (0, import_child_process2.spawn)(this.binaryPath, ["--version"]);
      let binaryExists = false;
      let ffmpegExists = !options?.ffmpeg;
      binaryProcess.on("error", () => binaryExists = false);
      binaryProcess.on("exit", (code) => {
        binaryExists = code === 0;
        if (options?.ffmpeg) {
          const ffmpegProcess = (0, import_child_process2.spawn)(this.ffmpegPath, ["-version"]);
          ffmpegProcess.on("error", () => ffmpegExists = false);
          ffmpegProcess.on("exit", (code2) => {
            ffmpegExists = code2 === 0;
            resolve(binaryExists && ffmpegExists);
          });
        } else {
          resolve(binaryExists);
        }
      });
    });
  }
  /**
   * Synchronously checks if yt-dlp and optionally FFmpeg are installed.
   * @param options - Check options
   * @returns true if binaries are available
   */
  checkInstallation(options) {
    if (options?.ffmpeg && !this.ffmpegPath) {
      throw new Error("FFmpeg path is not set");
    }
    const binaryResult = (0, import_child_process2.spawnSync)(this.binaryPath, ["--version"], {
      stdio: "ignore"
    });
    const ffmpegResult = options?.ffmpeg ? (0, import_child_process2.spawnSync)(this.ffmpegPath, ["-version"], { stdio: "ignore" }) : { status: 0 };
    return binaryResult.status === 0 && ffmpegResult.status === 0;
  }
  /**
   * Executes yt-dlp asynchronously with the provided URL and options.
   * @param url - Video URL
   * @param options - Execution options with optional callbacks
   * @returns Promise resolving to command output
   */
  async execAsync(url, options) {
    const args = this.buildArgs(url, options || {});
    const onData = (d) => {
      options?.onData?.(d);
      if (options?.onProgress) {
        const result = stringToProgress(d);
        if (result) {
          options.onProgress?.(result);
        }
      }
    };
    return this._executeAsync(args, onData);
  }
  /**
   * Executes yt-dlp synchronously.
   * @param url - Video URL
   * @param options - Execution options
   * @returns Spawned child process
   */
  exec(url, options) {
    const args = this.buildArgs(url, options || {}, true);
    return this._execute(args);
  }
  _execute(args) {
    return spawnYtDlp(this.binaryPath, args);
  }
  async _executeAsync(args, onData) {
    if (!this.binaryPath) throw new Error("Ytdlp binary not found");
    const result = await runYtDlp(this.binaryPath, args, {
      onStdout: onData,
      onStderr: onData
    });
    return result.stdout;
  }
  buildArgs(url, opt, isProgress, extra) {
    return buildYtDlpArgs({
      url,
      options: opt,
      ffmpegPath: this.ffmpegPath,
      withProgressTemplate: isProgress,
      extra
    });
  }
  /**
   * Downloads a video synchronously.
   * @param url - Video URL
   * @param options - Download options
   * @returns Spawned child process with 'progress' event
   */
  download(url, options) {
    return downloadSync(this.getDownloadContext(), url, options);
  }
  /**
   * Downloads a video asynchronously.
   * @param url - Video URL
   * @param options - Download options with progress callback
   * @returns Promise resolving to DownloadResult with file paths
   */
  async downloadAsync(url, options) {
    return downloadAsync(this.getDownloadContext(), url, options);
  }
  /**
   * Creates a stream for video download.
   * @param url - Video URL
   * @param options - Stream options
   * @returns PipeResponse with pipe and pipeAsync methods
   */
  stream(url, options) {
    return createStream(this.getStreamContext(), url, options);
  }
  /**
   * Fetches video or playlist info.
   * @param url - Video or playlist URL
   * @param options - Info options
   * @returns Promise resolving to VideoInfo or PlaylistInfo
   */
  async getInfoAsync(url, options) {
    return getInfoAsync(this.getInfoContext(), url, options);
  }
  /**
   * Downloads audio only.
   * @param url - Video URL
   * @param format - Audio format (mp3, wav, flac, etc.)
   * @param options - Additional options
   */
  async downloadAudio(url, format = "mp3", options) {
    const validFormats = [
      "aac",
      "flac",
      "mp3",
      "m4a",
      "opus",
      "vorbis",
      "wav",
      "alac"
    ];
    if (!validFormats.includes(format)) {
      throw new Error(
        `Invalid audio format: ${format}. Supported: ${validFormats.join(", ")}`
      );
    }
    return this.downloadAsync(url, {
      ...options,
      extractAudio: true,
      audioFormat: format
    });
  }
  /**
   * Downloads video with specific quality.
   * @param url - Video URL
   * @param quality - Video quality (e.g., "1080p", "720p", "best")
   * @param options - Additional options
   */
  async downloadVideo(url, quality = "best", options) {
    const validQualities = [
      "best",
      "2160p",
      "1440p",
      "1080p",
      "720p",
      "480p",
      "360p",
      "240p",
      "144p",
      "highest",
      "lowest"
    ];
    if (!validQualities.includes(quality)) {
      throw new Error(
        `Invalid video quality: ${quality}. Supported: ${validQualities.join(", ")}`
      );
    }
    const format = quality === "best" ? "bestvideo+bestaudio/best" : `bestvideo[height<=${parseInt(quality) || 1080}]+bestaudio/best[height<=${parseInt(quality) || 1080}]`;
    return this.downloadAsync(url, {
      ...options,
      format
    });
  }
  /**
   * Gets available subtitles.
   * @param url - Video URL
   * @param options - Additional options
   */
  async getSubtitles(url, options) {
    const result = await this.downloadAsync(url, {
      ...options,
      listSubs: true,
      skipDownload: true
    });
    if (!result.output) return [];
    return [];
  }
  /**
   * Fetches video comments.
   * @param url - Video URL
   * @param maxComments - Maximum comments to fetch
   * @param options - Additional options
   */
  async getComments(url, maxComments = 20, options) {
    const result = await this.downloadAsync(url, {
      ...options,
      writeComments: true,
      dumpSingleJson: true,
      skipDownload: true,
      extractorArgs: {
        youtube: [`max_comments=${maxComments}`, "player_skip=webpage"]
      }
    });
    try {
      const data = JSON.parse(result.output);
      return data.comments || [];
    } catch {
      return [];
    }
  }
  /**
   * Gets direct media URLs.
   * @param url - Video URL
   * @param options - Args options
   * @returns Promise resolving to array of URLs
   */
  async getDirectUrlsAsync(url, options) {
    return getDirectUrlsAsync(this.getInfoContext(), url, options);
  }
  /**
   * Gets formats, preferring JSON with fallback to table parsing.
   * @param url - Video URL
   * @param options - Args options
   * @returns Promise resolving to FormatsResult
   */
  async getFormatsAsync(url, options) {
    return getFormatsAsync(this.getInfoContext(), url, options);
  }
  /**
   * Fetches video thumbnails.
   * @param url - Video URL
   * @returns Promise resolving to array of VideoThumbnail
   */
  async getThumbnailsAsync(url) {
    return getThumbnailsAsync(this.getInfoContext(), url);
  }
  /**
   * Fetches video title.
   * @param url - Video URL
   * @returns Promise resolving to title string
   */
  async getTitleAsync(url) {
    return getTitleAsync(this.getInfoContext(), url);
  }
  /**
   * Gets yt-dlp version.
   * @returns Promise resolving to version string
   */
  async getVersionAsync() {
    return getVersionAsync(this.getInfoContext());
  }
  /**
   * Downloads FFmpeg binaries.
   * @returns Promise resolving when download is complete
   */
  async downloadFFmpeg() {
    return downloadFFmpeg();
  }
  /**
   * Gets video/audio content as a File object.
   * Optimized: Uses --print before_dl:%(title)s.%(ext)s to capture
   * filename during download - no separate info fetch required.
   * @param url - Video URL
   * @param options - File options with progress callback
   * @returns Promise resolving to File object
   */
  async getFileAsync(url, options) {
    return getFileAsync(this.getStreamContext(), url, options);
  }
  /**
   * Gets media URLs using --print urls.
   * @param url - Video URL
   * @param options - Args options
   * @returns Promise resolving to array of URLs
   */
  async getUrlsAsync(url, options) {
    return getUrlsAsync(this.getInfoContext(), url, options);
  }
  /**
   * Updates yt-dlp to the latest version.
   * @param options - Update options
   * @returns Promise resolving to UpdateResult
   */
  async updateYtDlpAsync(options) {
    const preferBuiltIn = options?.preferBuiltIn !== false;
    if (preferBuiltIn && this.binaryPath) {
      try {
        await runYtDlp(this.binaryPath, ["--update"]);
        const version2 = await this.getVersionAsync().catch(() => void 0);
        return {
          method: "built-in",
          binaryPath: this.binaryPath,
          version: version2
        };
      } catch {
      }
    }
    const outDir = options?.outDir || (this.binaryPath ? import_path2.default.dirname(this.binaryPath) : void 0);
    const verifyChecksum = options?.verifyChecksum !== false;
    if (verifyChecksum) {
      const result = await downloadYtDlpVerified(outDir);
      const version2 = await runYtDlp(result.path, ["--version"]).then((res) => res.stdout.trim()).catch(() => void 0);
      return {
        method: "download",
        binaryPath: result.path,
        version: version2,
        verified: result.verified
      };
    }
    const downloadedPath = await downloadYtDlp(outDir);
    const version = await runYtDlp(downloadedPath, ["--version"]).then((res) => res.stdout.trim()).catch(() => void 0);
    return {
      method: "download",
      binaryPath: downloadedPath,
      version,
      verified: false
    };
  }
};
var helpers = {
  downloadFFmpeg,
  findFFmpegBinary,
  PROGRESS_STRING,
  getContentType,
  getFileExtension,
  parseFormatOptions,
  stringToProgress,
  createArgs,
  extractThumbnails,
  downloadFile,
  BIN_DIR,
  downloadYtDlp,
  downloadYtDlpVerified,
  findYtdlpBinary
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BIN_DIR,
  YtDlp,
  helpers
});
