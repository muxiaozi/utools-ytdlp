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
  Download: () => Download,
  Exec: () => Exec,
  Stream: () => Stream,
  YtDlp: () => YtDlp,
  createDownload: () => createDownload,
  createExec: () => createExec,
  createStreamBuilder: () => createStream,
  helpers: () => helpers
});
module.exports = __toCommonJS(index_exports);
var import_child_process = require("child_process");
var fs6 = __toESM(require("fs"));
var import_path2 = __toESM(require("path"));
var import_buffer = require("buffer");
var import_stream = require("stream");

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
var ByFilter = ["audioonly", "videoonly", "audioandvideo", "mergevideo"];
function parseFormatOptions(format) {
  let filter;
  let type;
  let quality;
  if (!format) {
    return [];
  }
  if (typeof format === "string" && !ByFilter.includes(format)) {
    return ["-f", format];
  }
  if (typeof format === "string" && ByFilter.includes(format)) {
    filter = format;
  }
  if (Object.keys(format).length === 0 || !format || typeof format !== "object") {
    return ["-f", "bv*+ba"];
  }
  if (typeof format === "object") {
    filter = format.filter;
    type = format.type;
    quality = format.quality;
  }
  let formatArr = [];
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
function getFileExtensionFromArgs(options) {
  if (!options?.extractAudio) {
    return null;
  }
  return options.audioFormat || "mp3";
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

// src/utils/paths.ts
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
    if (process.platform !== "win32") {
      for (const outputPath of outputPaths) {
        import_fs.default.chmodSync(outputPath, 493);
      }
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
    if (process.platform !== "win32") {
      fs4.chmodSync(outputPath, 493);
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

// src/core/parse.ts
function parsePrintedOutput(output) {
  return output.replace(/~ytdlp-progress-\{[\s\S]*?\}\n?/g, "").split(/\r?\n/).map((line) => line.trim()).filter((line) => line.length > 0).filter((line) => !line.includes("__YTDLP_FILEPATH__:")).filter((line) => !line.includes("__YTDLP_VIDEO_INFO__:")).filter((line) => !line.includes("__YTDLP_BEFORE_DL__:")).join("\n");
}
function parsePrintedVideoInfo(output) {
  const results = [];
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
        results.push(result);
      } catch {
      }
    }
  }
  return results;
}
function parseBeforeDownloadInfo(line) {
  const trimmed = line.trim();
  if (!trimmed.startsWith("__YTDLP_BEFORE_DL__:")) {
    return null;
  }
  const jsonStr = trimmed.replace("__YTDLP_BEFORE_DL__:", "").trim();
  try {
    const cleanedJsonStr = jsonStr.replace(/:"N\/A"/g, ":null").replace(/:"NA"/g, ":null").replace(/:""/, ':"NA"');
    const parsed = JSON.parse(cleanedJsonStr);
    const result = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (value === "NA" || value === "N/A") {
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

// src/builder/base-builder.ts
var import_node_events = require("events");

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
    args.push("--", url);
  }
  return args;
}

// src/builder/base-builder.ts
var import_node_fs = __toESM(require("fs"));
var BaseBuilder = class extends import_node_events.EventEmitter {
  constructor(url, options) {
    super();
    this.binaryPath = "";
    this.videoUrl = "";
    this.extraArgs = {};
    this.rawArgs = [];
    this.videoUrl = url;
    this.binaryPath = options?.binaryPath || findYtdlpBinary() || "";
    this.ffmpegPath = options?.ffmpegPath || findFFmpegBinary();
    if (!this.binaryPath || !import_node_fs.default.existsSync(this.binaryPath)) {
      console.error(
        new Error(
          "yt-dlp binary not found. Please install yt-dlp or specify correct binaryPath in options."
        )
      );
    }
    if (this.ffmpegPath && !import_node_fs.default.existsSync(this.ffmpegPath)) {
      console.error(
        new Error(
          `FFmpeg binary not found at: ${this.ffmpegPath}. Please install FFmpeg or specify correct ffmpegPath.`
        )
      );
    }
  }
  /**
   * Set the binary path for yt-dlp
   */
  setBinaryPath(path5) {
    this.binaryPath = path5;
    return this;
  }
  /**
   * Set the FFmpeg binary path
   */
  setFfmpegPath(path5) {
    this.ffmpegPath = path5;
    return this;
  }
  /**
   * Set the format filter (mergevideo, audioonly, videoonly, audioandvideo)
   */
  format(format) {
    this.formatValue = format;
    return this;
  }
  /**
   * Set the format filter (mergevideo, audioonly, videoonly, audioandvideo)
   */
  filter(filter) {
    const existing = typeof this.formatValue === "object" ? this.formatValue : {};
    this.formatValue = { ...existing, filter };
    return this;
  }
  /**
   * Set the format quality (0-10, 0 is best)
   */
  quality(quality) {
    const existing = typeof this.formatValue === "object" ? this.formatValue : {};
    this.formatValue = {
      filter: this.formatValue,
      ...existing,
      quality
    };
    return this;
  }
  /**
   * Set the format type (audioonly, videoonly, audioandvideo)
   */
  type(type) {
    const existing = typeof this.formatValue === "object" ? this.formatValue : {};
    this.formatValue = {
      filter: this.formatValue,
      ...existing,
      type
    };
    return this;
  }
  options(options) {
    this.extraArgs = { ...this.extraArgs, ...options };
    return this;
  }
  /**
   * Limit download rate (e.g., '1M', '500K')
   */
  rateLimit(rate) {
    this.extraArgs.limitRate = rate;
    return this;
  }
  /**
   * Set cookies string
   */
  cookies(cookies) {
    this.extraArgs.cookies = cookies;
    return this;
  }
  /**
   * Set cookies from browser
   */
  cookiesFromBrowser(browser) {
    this.extraArgs.cookiesFromBrowser = browser;
    return this;
  }
  /**
   * Set proxy URL
   */
  proxy(url) {
    this.extraArgs.proxy = url;
    return this;
  }
  /**
   * Add custom arguments
   */
  addOption(key, value) {
    this.extraArgs[key] = value;
    return this;
  }
  /**
   * Add raw command line arguments
   */
  addArgs(...args) {
    this.rawArgs.push(...args);
    return this;
  }
  /**
   * Enable audio extraction
   */
  extractAudio(format) {
    this.extraArgs.extractAudio = true;
    if (format) {
      this.extraArgs.audioFormat = format;
    }
    return this;
  }
  /**
   * Set audio format for extraction
   */
  audioFormat(format) {
    this.extraArgs.audioFormat = format;
    return this;
  }
  /**
   * Set audio quality (0-10, 0 is best)
   */
  audioQuality(quality) {
    this.extraArgs.audioQuality = quality;
    return this;
  }
  /**
   * Embed thumbnail in the file
   */
  embedThumbnail() {
    this.extraArgs.embedThumbnail = true;
    return this;
  }
  /**
   * Embed subtitles in the file
   */
  embedSubs() {
    this.extraArgs.embedSubs = true;
    return this;
  }
  /**
   * Embed metadata in the file
   */
  embedMetadata() {
    this.extraArgs.embedMetadata = true;
    return this;
  }
  /**
   * Write subtitles to file
   */
  writeSubs() {
    this.extraArgs.writeSubs = true;
    return this;
  }
  /**
   * Write auto-generated subtitles
   */
  writeAutoSubs() {
    this.extraArgs.writeAutoSubs = true;
    return this;
  }
  /**
   * Set subtitle languages
   */
  subLangs(langs) {
    this.extraArgs.subLangs = langs;
    return this;
  }
  /**
   * Write thumbnail to file
   */
  writeThumbnail() {
    this.extraArgs.writeThumbnail = true;
    return this;
  }
  /**
   * Set username for authentication
   */
  username(user) {
    this.extraArgs.username = user;
    return this;
  }
  /**
   * Set password for authentication
   */
  password(pass) {
    this.extraArgs.password = pass;
    return this;
  }
  /**
   * Set playlist start index
   */
  playlistStart(index) {
    this.extraArgs.playlistStart = index;
    return this;
  }
  /**
   * Set playlist end index
   */
  playlistEnd(index) {
    this.extraArgs.playlistEnd = index;
    return this;
  }
  /**
   * Set specific playlist items
   */
  playlistItems(items) {
    this.extraArgs.playlistItems = items;
    return this;
  }
  /**
   * Build format-related arguments from current settings
   */
  buildFormatArgs() {
    if (!this.formatValue) {
      return [];
    }
    return parseFormatOptions(this.formatValue);
  }
  /**
   * Build base yt-dlp arguments (common to all operations)
   */
  buildBaseArgs(extra = []) {
    if (!this.videoUrl) {
      throw new Error("URL is required.");
    }
    const formatArgs = this.buildFormatArgs();
    return buildYtDlpArgs({
      url: this.videoUrl,
      options: this.extraArgs,
      ffmpegPath: this.ffmpegPath,
      withProgressTemplate: true,
      extra: [...formatArgs, ...extra, ...this.rawArgs]
    });
  }
  /**
   * Enable debug printing of the command line before execution
   */
  debugPrint(enable = true) {
    this.extraArgs.debugPrintCommandLine = enable;
    return this;
  }
  /**
   * Get the full command string (for debugging)
   */
  getCommand() {
    const args = this.buildArgs();
    return `${this.binaryPath} ${args.join(" ")}`;
  }
  /**
   * Print the command line to stderr if debugPrintCommandLine is enabled
   * Should be called before spawning the process
   */
  printDebugCommandLine(args) {
    if (this.extraArgs.debugPrintCommandLine) {
      const command = `${this.binaryPath} ${args.join(" ")}`;
      console.error(`[ytdlp-nodejs] Command: ${command}`);
    }
  }
  /**
   * Validates that binary path is set
   */
  validateBinaryPath() {
    if (!this.binaryPath) {
      throw new Error(
        "Binary path is required. Use .setBinaryPath() or pass it in constructor."
      );
    }
  }
  /**
   * Kill the running process
   */
  kill(signal) {
    return this.process?.kill(signal) ?? false;
  }
  /**
   * Get the process ID
   */
  get pid() {
    return this.process?.pid;
  }
};

// src/core/constants.ts
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
function buildVideoInfoPrintArg() {
  const jsonFields = VIDEO_INFO_FIELDS.map(
    (field) => `"${field}":%(${field}|null)j`
  ).join(",");
  return `after_move:__YTDLP_VIDEO_INFO__:{${jsonFields}}`;
}
function buildBeforeDownloadPrintArg() {
  const jsonFields = VIDEO_INFO_FIELDS.map(
    (field) => `"${field}":%(${field}|null)j`
  ).join(",");
  return `before_dl:__YTDLP_BEFORE_DL__:{${jsonFields}}`;
}
function getDownloadPrintArgs() {
  return ["--print", buildVideoInfoPrintArg(), "--progress", "--newline"];
}

// src/builder/download-builder.ts
var import_node_child_process = require("child_process");
var Download = class extends BaseBuilder {
  constructor(url, options) {
    super(url, options);
    this.on("error", () => {
    });
  }
  /**
   * Add a typed event listener
   */
  on(event, listener) {
    return super.on(event, listener);
  }
  /**
   * Add a one-time typed event listener
   */
  once(event, listener) {
    return super.once(event, listener);
  }
  /**
   * Emit a typed event
   */
  emit(event, ...args) {
    return super.emit(event, ...args);
  }
  /**
   * Set the output directory
   */
  output(path5) {
    this.outputDir = path5;
    return this;
  }
  /**
   * Set the output template (yt-dlp -o option)
   */
  setOutputTemplate(template) {
    this.outputPath = template;
    return this;
  }
  /**
   * Skip download (useful for metadata extraction)
   */
  skipDownload() {
    this.extraArgs.skipDownload = true;
    return this;
  }
  /**
   * Build the command arguments
   */
  buildArgs() {
    const options = { ...this.extraArgs };
    if (this.outputDir) {
      options.output = `${this.outputDir}/%(title)s.%(ext)s`;
    }
    if (this.outputPath) {
      options.output = this.outputPath;
    }
    const savedExtraArgs = this.extraArgs;
    this.extraArgs = options;
    const extraPrintArgs = [...getDownloadPrintArgs()];
    if (this.listenerCount("beforeDownload") > 0) {
      extraPrintArgs.unshift("--print", buildBeforeDownloadPrintArg());
    }
    const args = this.buildBaseArgs(extraPrintArgs);
    this.extraArgs = savedExtraArgs;
    return args;
  }
  /**
   * Run the download
   */
  run() {
    if (this.resultPromise) {
      return this.resultPromise;
    }
    this.resultPromise = new Promise((resolve, reject) => {
      try {
        this.validateBinaryPath();
        const args = this.buildArgs();
        const command = `${this.binaryPath} ${args.join(" ")}`;
        this.printDebugCommandLine(args);
        this.process = (0, import_node_child_process.spawn)(this.binaryPath, args);
        this.emit("start", command);
        let stdout = "";
        let stderr = "";
        this.process.stdout?.on("data", (data) => {
          const text = data.toString();
          stdout += text;
          this.emit("stdout", text);
          const beforeInfo = parseBeforeDownloadInfo(text);
          if (beforeInfo) {
            this.emit(
              "beforeDownload",
              beforeInfo
            );
          }
          const progress = stringToProgress(text);
          if (progress) {
            this.emit("progress", progress);
          }
        });
        this.process.stderr?.on("data", (data) => {
          const text = data.toString();
          stderr += text;
          this.emit("stderr", text);
          const progress = stringToProgress(text);
          if (progress) {
            this.emit("progress", progress);
          }
        });
        this.process.on("error", (error) => {
          this.emit("error", error);
          reject(error);
        });
        this.process.on("close", (code) => {
          if (code !== 0 && code !== null) {
            const error = new Error(
              `yt-dlp exited with code ${code}: ${stderr}`
            );
            this.emit("error", error);
            reject(error);
            return;
          }
          const output = parsePrintedOutput(stdout);
          const info = parsePrintedVideoInfo(
            stdout
          );
          const result = {
            output,
            filePaths: info.map((i) => i?.filepath ?? "").filter(Boolean),
            info,
            stderr
          };
          this.emit("finish", result);
          resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
    return this.resultPromise;
  }
  /**
   * Make the builder directly awaitable
   */
  then(onfulfilled, onrejected) {
    return this.run().then(onfulfilled, onrejected);
  }
  /**
   * Catch errors
   */
  catch(onrejected) {
    return this.run().catch(onrejected);
  }
  /**
   * Finally handler
   */
  finally(onfinally) {
    return this.run().finally(onfinally);
  }
};
function createDownload(url, options) {
  return new Download(url, options);
}

// src/builder/stream-builder.ts
var import_node_stream = require("stream");
var import_node_child_process2 = require("child_process");
var Stream = class extends BaseBuilder {
  constructor(url, options) {
    super(url, options);
    this.totalBytes = 0;
    this.started = false;
    this.on("error", () => {
    });
  }
  /**
   * Add a typed event listener
   */
  on(event, listener) {
    return super.on(event, listener);
  }
  /**
   * Add a one-time typed event listener
   */
  once(event, listener) {
    return super.once(event, listener);
  }
  /**
   * Emit a typed event
   */
  emit(event, ...args) {
    return super.emit(event, ...args);
  }
  /**
   * Build the command arguments
   */
  buildArgs() {
    const baseArgs = ["-o", "-", "--no-playlist", "--progress", "--no-quiet"];
    if (this.listenerCount("beforeDownload") > 0) {
      baseArgs.push("--print", buildBeforeDownloadPrintArg());
    }
    return this.buildBaseArgs(baseArgs);
  }
  /**
   * Start the stream process
   */
  startStream() {
    if (this.started) {
      return this.passThrough;
    }
    this.validateBinaryPath();
    this.started = true;
    this.passThrough = new import_node_stream.PassThrough();
    const args = this.buildArgs();
    const command = `${this.binaryPath} ${args.join(" ")}`;
    this.printDebugCommandLine(args);
    this.process = (0, import_node_child_process2.spawn)(this.binaryPath, args, { shell: false });
    this.emit("start", command);
    this.process.stdout?.on("data", (chunk) => {
      this.totalBytes += chunk.length;
      this.passThrough.write(chunk);
      this.emit("data", chunk);
    });
    this.process.stderr?.on("data", (data) => {
      const text = data.toString();
      const beforeInfo = parseBeforeDownloadInfo(text);
      if (beforeInfo) {
        this.emit(
          "beforeDownload",
          beforeInfo
        );
      }
      const progress = stringToProgress(text);
      if (progress) {
        this.emit("progress", progress);
      }
    });
    this.process.on("error", (error) => {
      this.emit("error", error);
      this.passThrough.destroy(error);
    });
    this.process.on("close", (code) => {
      if (code !== 0 && code !== null) {
        const error = new Error(`yt-dlp exited with code ${code}`);
        this.emit("error", error);
        this.passThrough.destroy(error);
      } else {
        this.passThrough.end();
        this.emit("end");
      }
    });
    return this.passThrough;
  }
  /**
   * Pipe the stream to a writable destination and wait for completion.
   * This method is awaitable - returns a Promise.
   *
   * @example
   * ```typescript
   * const result = await ytdlp
   *   .stream(url)
   *   .filter('mergevideo')
   *   .pipe(createWriteStream('video.mp4'));
   * ```
   */
  pipe(destination, options) {
    const startTime = Date.now();
    const stream = this.startStream();
    return new Promise((resolve, reject) => {
      stream.pipe(destination, options);
      destination.on("finish", () => {
        resolve({
          bytes: this.totalBytes,
          duration: Date.now() - startTime
        });
      });
      destination.on("error", reject);
      this.passThrough.on("error", reject);
    });
  }
  /**
   * Alias for pipe() - for backward compatibility
   */
  pipeAsync(destination, options) {
    return this.pipe(destination, options);
  }
  /**
   * Collect the entire stream into a Buffer
   */
  async toBuffer() {
    const chunks = [];
    return new Promise((resolve, reject) => {
      const stream = this.startStream();
      stream.on("data", (chunk) => {
        chunks.push(chunk);
      });
      stream.on("end", () => {
        resolve(Buffer.concat(chunks));
      });
      stream.on("error", reject);
    });
  }
  /**
   * Get the underlying PassThrough stream
   */
  getStream() {
    return this.startStream();
  }
};
function createStream(url, options) {
  return new Stream(url, options);
}

// src/builder/exec-builder.ts
var import_node_stream2 = require("stream");
var import_node_child_process3 = require("child_process");
var Exec = class extends BaseBuilder {
  constructor(url, options) {
    super(url, options);
    this.totalBytes = 0;
    this.started = false;
    this.output = "";
    this.on("error", () => {
    });
  }
  /**
   * Add a typed event listener
   */
  on(event, listener) {
    return super.on(event, listener);
  }
  /**
   * Add a one-time typed event listener
   */
  once(event, listener) {
    return super.once(event, listener);
  }
  /**
   * Emit a typed event
   */
  emit(event, ...args) {
    return super.emit(event, ...args);
  }
  /**
   * Build the command arguments
   */
  buildArgs() {
    const baseArgs = [];
    const printArgs = [...getDownloadPrintArgs()];
    if (this.listenerCount("beforeDownload") > 0) {
      printArgs.unshift("--print", buildBeforeDownloadPrintArg());
    }
    if (this.listenerCount("afterDownload") > 0) {
      printArgs.push("--print", "after_move:filepath");
    }
    return this.buildBaseArgs([...baseArgs, ...printArgs]);
  }
  /**
   * Start the exec process (for pipe mode)
   */
  startStream() {
    if (this.started) {
      return this.passThrough;
    }
    this.validateBinaryPath();
    this.started = true;
    this.passThrough = new import_node_stream2.PassThrough();
    this.output = "";
    let args = this.buildArgs();
    if (!args.includes("--no-playlist")) {
      args = ["--no-playlist", ...args];
    }
    const command = `${this.binaryPath} ${args.join(" ")}`;
    this.printDebugCommandLine(args);
    this.process = (0, import_node_child_process3.spawn)(this.binaryPath, args, { shell: false });
    this.emit("start", command);
    this.process.stdout?.on("data", (chunk) => {
      this.totalBytes += chunk.length;
      this.passThrough.write(chunk);
      this.emit("data", chunk);
      const text = chunk.toString();
      this.emit("stdout", text);
      const beforeInfo = parseBeforeDownloadInfo(text);
      if (beforeInfo) {
        this.beforeDownloadInfo = beforeInfo;
        this.emit("beforeDownload", this.beforeDownloadInfo);
      }
      const progress = stringToProgress(text);
      if (progress) {
        this.emit("progress", progress);
      }
    });
    this.process.stderr?.on("data", (data) => {
      const text = data.toString();
      this.emit("stderr", text);
      this.output += text;
      const beforeInfo = parseBeforeDownloadInfo(text);
      if (beforeInfo) {
        this.beforeDownloadInfo = beforeInfo;
        this.emit("beforeDownload", this.beforeDownloadInfo);
      }
      const progress = stringToProgress(text);
      if (progress) {
        this.emit("progress", progress);
        if (progress.status === "finished") {
          if (this.beforeDownloadInfo) {
            this.afterDownloadInfo = {
              ...this.beforeDownloadInfo,
              filepath: progress.filename
            };
            this.emit("afterDownload", this.afterDownloadInfo);
          }
        }
      }
    });
    this.process.on("error", (error) => {
      this.emit("error", error);
      this.passThrough.destroy(error);
    });
    this.process.on("close", (code) => {
      if (code !== 0 && code !== null) {
        const error = new Error(`yt-dlp exited with code ${code}`);
        this.emit("error", error);
        this.passThrough.destroy(error);
      } else {
        this.passThrough.end();
        this.emit("end");
      }
    });
    return this.passThrough;
  }
  /**
   * Pipe the stream to a writable destination and wait for completion.
   * This method is awaitable - returns a Promise.
   *
   * @example
   * ```typescript
   * import { createWriteStream } from 'fs';
   *
   * const result = await new Exec()
   *   .url(url)
   *   .filter('mergevideo')
   *   .on('beforeDownload', (info) => console.log('Starting:', info.title))
   *   .pipe(createWriteStream('video.mp4'));
   * ```
   */
  pipe(destination, options) {
    const startTime = Date.now();
    const stream = this.startStream();
    return new Promise((resolve, reject) => {
      stream.pipe(destination, options);
      destination.on("finish", () => {
        resolve({
          bytes: this.totalBytes,
          duration: Date.now() - startTime,
          info: this.afterDownloadInfo,
          output: this.output
        });
      });
      destination.on("error", reject);
      this.passThrough.on("error", reject);
    });
  }
  /**
   * Alias for pipe() - for backward compatibility
   */
  pipeAsync(destination, options) {
    return this.pipe(destination, options);
  }
  /**
   * Collect the entire stream into a Buffer
   */
  async toBuffer() {
    const chunks = [];
    return new Promise((resolve, reject) => {
      const stream = this.startStream();
      stream.on("data", (chunk) => {
        chunks.push(chunk);
      });
      stream.on("end", () => {
        resolve(Buffer.concat(chunks));
      });
      stream.on("error", reject);
    });
  }
  /**
   * Get the underlying PassThrough stream
   */
  getStream() {
    return this.startStream();
  }
  /**
   * Execute the yt-dlp command and return the result (non-pipe mode)
   */
  exec() {
    if (this.resultPromise) {
      return this.resultPromise;
    }
    this.resultPromise = new Promise((resolve, reject) => {
      try {
        this.validateBinaryPath();
        const args = this.buildArgs();
        const command = `${this.binaryPath} ${args.join(" ")}`;
        this.printDebugCommandLine(args);
        this.process = (0, import_node_child_process3.spawn)(this.binaryPath, args, { shell: false });
        this.emit("start", command);
        let stdout = "";
        let stderr = "";
        this.process.stdout?.on("data", (data) => {
          const text = data.toString();
          stdout += text;
          this.emit("stdout", text);
          const beforeInfo = parseBeforeDownloadInfo(text);
          if (beforeInfo) {
            this.beforeDownloadInfo = beforeInfo;
            this.emit("beforeDownload", this.beforeDownloadInfo);
          }
          this.emit("data", data);
          const progress = stringToProgress(text);
          if (progress) {
            this.emit("progress", progress);
            if (progress.status === "finished" && this.beforeDownloadInfo) {
              this.afterDownloadInfo = {
                ...this.beforeDownloadInfo,
                filepath: progress.filename
              };
              this.emit("afterDownload", this.afterDownloadInfo);
            }
          }
        });
        this.process.stderr?.on("data", (data) => {
          const text = data.toString();
          stderr += text;
          this.emit("stderr", text);
          const beforeInfo = parseBeforeDownloadInfo(text);
          if (beforeInfo) {
            this.beforeDownloadInfo = beforeInfo;
            this.emit("beforeDownload", this.beforeDownloadInfo);
          }
          const progress = stringToProgress(text);
          if (progress) {
            this.emit("progress", progress);
            if (progress.status === "finished" && this.beforeDownloadInfo) {
              this.afterDownloadInfo = {
                ...this.beforeDownloadInfo,
                filepath: progress.filename
              };
              this.emit("afterDownload", this.afterDownloadInfo);
            }
          }
        });
        this.process.on("error", (error) => {
          this.emit("error", error);
          reject(error);
        });
        this.process.on("close", (code) => {
          const output = parsePrintedOutput(stdout);
          const info = parsePrintedVideoInfo(
            stdout
          );
          const result = {
            stdout,
            stderr,
            exitCode: code,
            command,
            info,
            output,
            filePaths: info.map((i) => i?.filepath ?? "").filter(Boolean)
          };
          this.emit("complete", result);
          this.emit("end");
          resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
    return this.resultPromise;
  }
  /**
   * Alias for exec() - for convenience
   */
  run() {
    return this.exec();
  }
  /**
   * Make the builder directly awaitable
   */
  then(onfulfilled, onrejected) {
    return this.exec().then(onfulfilled, onrejected);
  }
  /**
   * Catch errors
   */
  catch(onrejected) {
    return this.exec().catch(onrejected);
  }
  /**
   * Finally handler
   */
  finally(onfinally) {
    return this.exec().finally(onfinally);
  }
};
function createExec(url, options) {
  return new Exec(url, options);
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
    if (!this.binaryPath || !fs6.existsSync(this.binaryPath)) {
      console.error(
        new Error(
          "yt-dlp binary not found. Please install yt-dlp or specify correct binaryPath in options."
        )
      );
    }
    if (this.ffmpegPath && !fs6.existsSync(this.ffmpegPath)) {
      console.error(
        new Error(
          `FFmpeg binary not found at: ${this.ffmpegPath}. Please install FFmpeg or specify correct ffmpegPath.`
        )
      );
    }
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
      const binaryProcess = (0, import_child_process.spawn)(this.binaryPath, ["--version"]);
      let binaryExists = false;
      let ffmpegExists = !options?.ffmpeg;
      binaryProcess.on("error", () => binaryExists = false);
      binaryProcess.on("exit", (code) => {
        binaryExists = code === 0;
        if (options?.ffmpeg) {
          const ffmpegProcess = (0, import_child_process.spawn)(this.ffmpegPath, ["-version"]);
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
    const binaryResult = (0, import_child_process.spawnSync)(this.binaryPath, ["--version"], {
      stdio: "ignore"
    });
    const ffmpegResult = options?.ffmpeg ? (0, import_child_process.spawnSync)(this.ffmpegPath, ["-version"], { stdio: "ignore" }) : { status: 0 };
    return binaryResult.status === 0 && ffmpegResult.status === 0;
  }
  /**
   * Fetches video or playlist info.
   * @param url - Video or playlist URL
   * @param options - Info options
   * @returns Promise resolving to VideoInfo or PlaylistInfo
   */
  async getInfoAsync(url, options) {
    const res = await this.execAsync(url, {
      dumpSingleJson: true,
      flatPlaylist: true,
      ...options
    });
    return JSON.parse(res.output);
  }
  /**
   * Executes yt-dlp asynchronously with the provided URL and options.
   * Uses the Exec builder internally for better control and event handling.
   *
   * @param url - Video URL
   * @param options - Execution options with optional callbacks
   * @returns Promise resolving to command output
   */
  async execAsync(url, options) {
    const builder = new Exec(url, {
      binaryPath: this.binaryPath,
      ffmpegPath: this.ffmpegPath
    });
    const { onData, onProgress, onBeforeDownload, pipeTo, ...execOptions } = options || {};
    if (execOptions) {
      builder.options(execOptions);
    }
    if (onData) builder.on("stdout", onData);
    if (onProgress) builder.on("progress", onProgress);
    if (onBeforeDownload) builder.on("beforeDownload", onBeforeDownload);
    if (pipeTo) {
      return builder.pipe(pipeTo);
    }
    return builder.exec();
  }
  /**
   * Executes yt-dlp synchronously with typed events.
   *
   * Note: For a more modern fluent API with pipe support and better event handling,
   * consider using `execBuilder()` instead which returns an Exec builder instance.
   *
   * @param url - Video URL
   * @param options - Execution options
   * @returns ExecEmitter with typed 'progress', 'data', and 'close' events
   */
  exec(url, options) {
    const builder = new Exec(url, {
      binaryPath: this.binaryPath,
      ffmpegPath: this.ffmpegPath
    });
    if (options) {
      builder.options(options);
    }
    return builder;
  }
  /**
   * Downloads a video with fluent builder API.
   * Chain methods like .format(), .quality(), .on() and call .run() to execute.
   *
   * @param url - Video URL
   * @param options - Optional initial format options
   * @returns Download builder with fluent API
   *
   * @example
   * ```typescript
   * // With fluent API
   * const result = await ytdlp
   *   .download('https://youtube.com/watch?v=...')
   *   .filter('mergevideo')
   *   .quality('1080p')
   *   .on('progress', (p) => console.log(p.percentage_str))
   *   .run();
   *
   * // With initial options
   * const result = await ytdlp
   *   .download('https://youtube.com/watch?v=...', {
   *     format: { filter: 'mergevideo', quality: '1080p' }
   *   })
   *   .on('progress', (p) => console.log(p.percentage_str))
   *   .run();
   * ```
   */
  download(url, options) {
    const builder = new Download(url, {
      binaryPath: this.binaryPath,
      ffmpegPath: this.ffmpegPath
    });
    const { format, ...rest } = options || {};
    if (format) {
      builder.format(format);
    }
    if (rest) {
      builder.options(rest);
    }
    return builder;
  }
  /**
   * Downloads a video asynchronously.
   * @param url - Video URL
   * @param options - Download options with progress callback
   * @returns Promise resolving to DownloadResult with file paths
   */
  async downloadAsync(url, options) {
    const { onProgress, beforeDownload, ...rest } = options || {};
    const builder = this.download(url, rest);
    if (onProgress) {
      builder.on("progress", onProgress);
    }
    if (beforeDownload) {
      builder.on("beforeDownload", beforeDownload);
    }
    const result = await builder.run();
    return {
      output: result.output,
      filePaths: result.filePaths,
      info: result.info
    };
  }
  /**
   * Creates a stream with fluent builder API.
   * Chain methods to configure and use .pipe() or .pipeAsync() to stream.
   *
   * @param url - Video URL
   * @param options - Optional initial format options
   * @returns Stream builder with fluent API
   *
   * @example
   * ```typescript
   * import { createWriteStream } from 'fs';
   *
   * // Fluent builder API
   * await ytdlp
   *   .stream('https://youtube.com/watch?v=...')
   *   .filter('audioandvideo')
   *   .quality('highest')
   *   .type('mp4')
   *   .on('progress', (p) => console.log(p.percentage_str))
   *   .pipeAsync(createWriteStream('video.mp4'));
   *
   * // With initial options
   * await ytdlp
   *   .stream(url, { format: { filter: 'audioandvideo' } })
   *   .pipeAsync(createWriteStream('video.mp4'));
   * ```
   */
  stream(url, options) {
    const builder = new Stream(url, {
      binaryPath: this.binaryPath,
      ffmpegPath: this.ffmpegPath
    });
    const { format, ...rest } = options || {};
    if (format) {
      builder.format(format);
    }
    if (rest) {
      builder.options(rest);
    }
    return builder;
  }
  /**
   * Creates an exec builder with fluent API for arbitrary yt-dlp commands.
   * Combines features from Download and Stream builders.
   *
   * Supports both execution modes (get stdout/stderr) and pipe mode (stream to file).
   *
   * @param url - Video URL
   * @param options - Optional initial format options
   * @returns Exec builder with fluent API
   *
   * @example
   * ```typescript
   * import { createWriteStream } from 'fs';
   *
   * // Execute arbitrary command and get output
   * const result = await ytdlp
   *   .execBuilder('https://youtube.com/watch?v=...')
   *   .addArgs('--dump-single-json')
   *   .exec();
   *
   * console.log('Output:', result.stdout);
   *
   * // Pipe to file with download events
   * await ytdlp
   *   .execBuilder('https://youtube.com/watch?v=...')
   *   .filter('mergevideo')
   *   .quality('720p')
   *   .on('beforeDownload', (info) => console.log('Starting:', info.title))
   *   .on('afterDownload', (info) => console.log('Finished:', info.filepath))
   *   .pipe(createWriteStream('video.mp4'));
   * ```
   */
  execBuilder(url, options) {
    const builder = new Exec(url, {
      binaryPath: this.binaryPath,
      ffmpegPath: this.ffmpegPath
    });
    const { format, ...rest } = options || {};
    if (format) {
      builder.format(format);
    }
    if (rest) {
      builder.options(rest);
    }
    return builder;
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
    const result = await this.execAsync(url, {
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
    const result = await this.execAsync(url, {
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
    const info = await this.getInfoAsync(url, options);
    return info.formats.map((f) => f.url);
  }
  /**
   * Gets formats, preferring JSON with fallback to table parsing.
   * @param url - Video URL
   * @param options - Args options
   * @returns Promise resolving to FormatsResult
   */
  async getFormatsAsync(url, options) {
    const info = await this.getInfoAsync(url, options);
    return {
      source: "json",
      info,
      formats: info.formats
    };
  }
  /**
   * Fetches video thumbnails.
   * @param url - Video URL
   * @returns Promise resolving to array of VideoThumbnail
   */
  async getThumbnailsAsync(url) {
    const info = await this.getInfoAsync(url);
    return info.thumbnails;
  }
  /**
   * Fetches video title.
   * @param url - Video URL
   * @returns Promise resolving to title string
   */
  async getTitleAsync(url) {
    const result = await this.execAsync(url, {
      print: "title"
    });
    return result.output.trim();
  }
  /**
   * Gets yt-dlp version.
   * @returns Promise resolving to version string
   */
  async getVersionAsync() {
    const result = await this.execAsync("", {
      printVersion: true
    });
    return result.output.trim();
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
   * Downloads the media to memory and returns a File object.
   * @param url - Video URL
   * @param options - File options with progress callback
   * @returns Promise resolving to File object
   */
  async getFileAsync(url, options) {
    let info;
    const {
      onBeforeDownload,
      onProgress,
      filename,
      metadata,
      format,
      ...rest
    } = options || {};
    const chunks = [];
    const passThrough = new import_stream.PassThrough();
    passThrough.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    const formatArgs = parseFormatOptions(format);
    const execOptions = { ...rest };
    if (formatArgs.length >= 2 && formatArgs[0] === "-f") {
      execOptions.format = formatArgs[1];
    }
    if (formatArgs.includes("--merge-output-format")) {
      const idx = formatArgs.indexOf("--merge-output-format");
      execOptions.mergeOutputFormat = formatArgs[idx + 1];
    }
    await this.execAsync(url, {
      ...execOptions,
      noPlaylist: true,
      pipeTo: passThrough,
      onProgress,
      onBeforeDownload: (p) => {
        info = p;
        onBeforeDownload?.(p);
      },
      output: "-"
    });
    let contentType;
    let extension;
    if (format && typeof format === "object") {
      contentType = getContentType(format);
      extension = getFileExtension(format);
    } else {
      const fromArgs = getContentTypeFromArgs(rest);
      contentType = fromArgs || "video/mp4";
      const extFromArgs = getFileExtensionFromArgs(rest);
      extension = extFromArgs || "mp4";
    }
    const blob = new import_buffer.Blob(chunks, { type: contentType });
    const defaultMetadata = {
      name: filename || `${info?.title || "download"}.${extension}`,
      type: contentType,
      size: blob.size,
      ...metadata
    };
    return new File([Buffer.concat(chunks)], defaultMetadata.name, {
      type: defaultMetadata.type
    });
  }
  /**
   * Gets media URLs using --print urls.
   * @param url - Video URL
   * @param options - Args options
   * @returns Promise resolving to array of URLs
   */
  async getUrlsAsync(url, options) {
    const result = await this.execAsync(url, {
      ...options,
      print: "urls"
    });
    return result.output.split("\n").filter(Boolean);
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
        await this.execAsync("", { update: true });
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
      const version2 = await this.getVersionAsyncUsingBinary(result.path).catch(
        () => void 0
      );
      return {
        method: "download",
        binaryPath: result.path,
        version: version2,
        verified: result.verified
      };
    }
    const downloadedPath = await downloadYtDlp(outDir);
    const version = await this.getVersionAsyncUsingBinary(downloadedPath).catch(
      () => void 0
    );
    return {
      method: "download",
      binaryPath: downloadedPath,
      version,
      verified: false
    };
  }
  /**
   * Gets version using a specific binary path.
   * @param binaryPath - Path to the yt-dlp binary
   * @returns Promise resolving to version string
   */
  async getVersionAsyncUsingBinary(binaryPath) {
    return new Promise((resolve, reject) => {
      const process2 = (0, import_child_process.spawn)(binaryPath, ["--version"]);
      let stdout = "";
      let stderr = "";
      process2.stdout?.on("data", (data) => {
        stdout += data.toString();
      });
      process2.stderr?.on("data", (data) => {
        stderr += data.toString();
      });
      process2.on("close", (code) => {
        if (code === 0) {
          resolve(stdout.trim());
        } else {
          reject(new Error(`Failed to get version: ${stderr}`));
        }
      });
      process2.on("error", reject);
    });
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
  Download,
  Exec,
  Stream,
  YtDlp,
  createDownload,
  createExec,
  createStreamBuilder,
  helpers
});
